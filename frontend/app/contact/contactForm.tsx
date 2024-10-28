"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { ContactUsSchema } from "@/lib/schemas/ContactUsFrom"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


import { useFormAction } from "@/lib/use-form-action"
import { createMessage } from "@/actions/createMessage"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)

  const form = useFormAction<z.infer<typeof ContactUsSchema>>({
    resolver: zodResolver(ContactUsSchema),
    reValidateMode: "onChange",
    defaultValues: {
      place: "",
      coupleNames: "",
      senderName: "",
      subject: "",
      email: "",
      message: "",
    },
  })
  return (
    <Form {...form}>
      <form
        {...form.submitAction(async (data: z.infer<typeof ContactUsSchema>) => {
          setLoading(true)
          const response = await createMessage(data)
          console.log(response)
          if (response.success) {
            toast.success(
              "Merci pour votre message, je vous contacterai dès que possible.",
            )
          } else {
            toast.error("Une erreur est survenue, veuillez réessayer.")
          }
          setLoading(false)
        })}
        className="w-full space-y-4 py-8 sm:w-96"
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input placeholder="De quoi s'agit il ?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date du mariage</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu du mariage</FormLabel>
              <FormControl>
                <Input placeholder="Où va-t-il se dérouler ?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coupleNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénoms des marié(e)s</FormLabel>
              <FormControl>
                <Input
                  placeholder="Comment s'appellent-ils/elles ?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="messageFrom"
          defaultValue="L'un des marié(e)s"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qui êtes vous ?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Veuillez choisir une option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Un proche">Un proche</SelectItem>
                  <SelectItem value="Un parent">Un parent</SelectItem>
                  <SelectItem value="L'un des marié(e)s">
                    {"L'un(e) des marié(e)s"}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre prénom</FormLabel>
              <FormControl>
                <Input placeholder="Comment vous appelez vous ?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre email." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Quelles sont vos attentes par rapport au mariage ?
Avez vous des précisions concernant l'évennement ?`}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Veuillez fournir le plus de détails possible afin que nous
                puissions vous aider rapidement.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={loading}>
          Envoyer
        </Button>
      </form>
    </Form>
  )
}
