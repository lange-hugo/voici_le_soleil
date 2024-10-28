import { z } from "zod"

export const ContactUsSchema = z.object({
  date: z.date(),
  place: z.string().min(1, {
    message: "Veuillez spécifier ce champ",
  }),
  coupleNames: z.string().min(1, {
    message: "Veuillez spécifier ce champ",
  }),
  messageFrom: z.string().min(1, {
    message: "Veuillez spécifier ce champ",
  }),
  senderName: z.string().min(1, {
    message: "Veuillez spécifier ce champ",
  }),
  subject: z.string().min(1, {
    message: "Veuillez spécifier ce champ",
  }),
  message: z.string().min(1, {
    message: "Veuillez spécifier ce champ",
  }),
  email: z.string().email({
    message: "Adresse mail invalide",
  }),
})
