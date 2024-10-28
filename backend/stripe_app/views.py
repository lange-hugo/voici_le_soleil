import re

import stripe
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from stripe_app.models import Order


class StripeView(GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_user(self):
        return self.request.user

    def get_permissions(self) -> list:
        match self.action:
            case "webhook":
                return [AllowAny()]
            case _:
                return super().get_permissions()

    def get_authenticators(self):
        if self.request.build_absolute_uri().endswith("webhook/"):
            return []
        return super().get_authenticators()

    @staticmethod
    def get_base_api_url(request) -> str:
        base_url = settings.FRONTEND_URL
        if base_url is not None:
            return base_url
        regex = r"(http.?:\/\/.+?\/)"
        return re.findall(regex, request.build_absolute_uri())[0]

    @action(detail=False, methods=["GET"])
    def checkout_session(self, request):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        base_api_url = self.get_base_api_url(request)
        products = self.get_user().products.filter(is_bought=False)
        try:
            checkout_session = stripe.checkout.Session.create(
                success_url=base_api_url + "?success=True",
                cancel_url=base_api_url + "?success=False",
                customer_email=self.get_user().email,
                payment_method_types=["card"],
                mode="payment",
                line_items=[
                    {
                        "quantity": 1,
                        "price_data": {
                            "currency": "eur",
                            "unit_amount": int(product.price * 100),
                            "product_data": {
                                "name": product.title,
                            },
                        },
                    }
                    for product in products
                ],
            )
            checkout_session_id = checkout_session["id"]
            user_products = self.get_user().products.filter(is_bought=False)
            for product in user_products:
                Order.objects.create(product=product, session=checkout_session_id)
            return Response(
                {"sessionUrl": checkout_session["url"]}, status=status.HTTP_200_OK
            )
        except Exception:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["post"])
    def webhook(self, request):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        endpoint_secret = settings.STRIPE_ENDPOINT_SECRET
        event = None
        payload = request.body
        sig_header = request.headers["STRIPE_SIGNATURE"]
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except ValueError:
            return Response(
                {"error": "ValueError"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except stripe.error.SignatureVerificationError:
            return Response(
                {"error": "Stripe Signature Verification Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        if event["type"] == "checkout.session.completed":
            session_id = event["data"]["object"]["id"]
            # Update product
            orders = Order.objects.filter(session=session_id)
            for order in orders:
                product = order.product
                product.is_bought = True
                product.save()
                # Remove all order relative to this product
                product.orders.all().delete()

            print("Payment was successful.")
        elif "failed" in event["type"]:
            print(f"Failed operation: {event["type"]}")
        else:
            print(f"Unhandled event type {event["type"]}")

        return Response(status=status.HTTP_200_OK)
