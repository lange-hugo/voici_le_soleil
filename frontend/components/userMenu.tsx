"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BiCart } from "react-icons/bi"
import { toast } from "sonner"

import { useLoggedInState } from "@/lib/stores/loggedIn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

import deleteProduct from "@/actions/deleteProduct"
import getProducts from "@/actions/getProducts"
import getUserInfo from "@/actions/getUserInfo"

import BuyButton from "./buyButton"
import checkAuth from "@/actions/checkAuth"
import signOut from "@/actions/signOut"

type Product = {
  id: number
  title: string
  price: number
  created_at: string
}

export default function UserMenu(): JSX.Element {
  const router = useRouter()
  const loggedIn = useLoggedInState()
  const [user, setUser] = useState<{ username: string | undefined | null }>()
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    async function fetchData() {
      const res = await checkAuth()
      loggedIn.setLoggedInState(res.success)
      if (res.success) {
        setUser(await getUserInfo())
        setProducts(await getProducts())
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !loggedIn.loggedInState ? (
    <Button onClick={() => router.push("/login")}>Connexion</Button>
  ) : (
    <Sheet
      onOpenChange={async () => {
        setProducts(await getProducts())
      }}
    >
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarFallback>
              {(user?.username ? user?.username[0] : "").toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col">
        <div className="flex h-full flex-col gap-8">
          <SheetHeader>
            <SheetTitle className="flex flex-row items-center gap-2">
              Mon panier
              <BiCart />
            </SheetTitle>
            <SheetDescription>
              Vous trouverez ici tous les produits que vous avez ajouté à votre
              panier.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-row items-center justify-center">
            {(products?.length ?? 0 >= 1) ? (
              <BuyButton products={products as Product[]} />
            ) : (
              <></>
            )}
          </div>
          <div className="mb-12 flex max-h-full flex-col gap-4 overflow-scroll">
            {products?.map((product, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex flex-row items-center justify-between">
                    <CardTitle>{product.title}</CardTitle>
                    <X
                      className="hover:bg-secondary size-5 cursor-pointer rounded-md"
                      onClick={async () => {
                        const res = await deleteProduct(product.id)
                        if (res.status === 204) {
                          toast.success("Produit retiré du panier avec succés!")
                          setProducts(await getProducts())
                        } else {
                          toast.error(
                            "Une erreur est survenue, veuillez réessayer.",
                          )
                        }
                      }}
                    />
                  </div>
                  <CardDescription>
                    Ajouté le {product.created_at}
                  </CardDescription>
                  <div className=" text-muted-foreground text-sm">
                    Prix: <span className="font-bold">{product.price}€</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <SheetFooter className="absolute bottom-5 right-5">
          <Button
            onClick={async () => {
              await signOut()
              loggedIn.setLoggedInState(false)
              router.push("/")
            }}
          >
            Se déconnecter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
