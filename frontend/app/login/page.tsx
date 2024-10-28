"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useLoggedInState } from "@/lib/stores/loggedIn"


import { Button } from "@/components/ui/button"
import HeadingText from "@/components/ui/heading-text"
import SignInForm from "@/components/signInFrom"
import CreateUserForm from "@/components/createUserFrom"

export default function Login() {
  const loggedIn = useLoggedInState()
  const [logginMode, setLogginMode] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (loggedIn.loggedInState) {
      router.push("/products")
    }
  }, [loggedIn, router])

  return (
    <>
      <>
        {logginMode ? (
          <div>
            <div className="flex flex-col items-center space-y-2 pt-20 text-center">
              <HeadingText
                subtext={"Entrez vos identifiants pour accéder à votre compte."}
              >
                Se connecter
              </HeadingText>
            </div>
            <SignInForm />
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center space-y-2 pt-20 text-center">
              <HeadingText
                subtext={
                  "Renseignez vos identifiants afin de créer votre compte."
                }
              >
                Créer un compte
              </HeadingText>
            </div>
            <CreateUserForm />
          </div>
        )}
      </>
      <div>
        {loggedIn.loggedInState ? (
          <></>
        ) : logginMode ? (
          <Button variant={"ghost"} onClick={() => setLogginMode(!logginMode)}>
            {"Je n'ai pas de compte"}
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={() => setLogginMode(!logginMode)}>
            {"J'ai déjà un compte"}
          </Button>
        )}
      </div>
    </>
  )
}
