"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { SignInSchema } from "@/lib/schemas/SignIn"
import { useLoggedInState } from "@/lib/stores/loggedIn"
import { useFormAction } from "@/lib/use-form-action"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import signIn from "@/actions/signIn"
import InputSecret from "./ui/input-secret"

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const loggedIn = useLoggedInState()
  const form = useFormAction<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Form {...form}>
      <form
        {...form.submitAction(async (data: z.infer<typeof SignInSchema>) => {
          const response = await signIn(data)
          console.log(response)
          if (response.success) {
            loggedIn.setLoggedInState(true)
            toast.success("Votre compte a bien été créé!")
          } else {
            toast.error("Une erreur est survenue, veuillez réessayer.")
          }
        })}
        className="w-full space-y-4 py-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="prénom.nom@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <InputSecret
                  field={field}
                  visible={showPassword}
                  setVisible={setShowPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Connexion
        </Button>
      </form>
    </Form>
  )
}
