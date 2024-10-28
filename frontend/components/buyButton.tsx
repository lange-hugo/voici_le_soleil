import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import getStripeCheckoutSession from "@/actions/stripeCheckoutSession"

type Product = {
  id: number
  title: string
  price: number
  created_at: string
}

interface ProductsProps {
  products: Product[]
}

const BuyButton: React.FC<ProductsProps> = () => {
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        const url = await getStripeCheckoutSession()
        router.push(url)
      }}
    >
      Valider le panier
    </Button>
  )
}

export default BuyButton
