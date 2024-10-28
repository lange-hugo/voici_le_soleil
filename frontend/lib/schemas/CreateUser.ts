import { z } from "zod"

export const CreateUserSchema = z.object({
  username: z
    .string()
    .regex(
      RegExp("^[a-zA-Z0-9_.-]*$"),
      "Veuillez utiliser un nom d'utilisateur ne contenant que des chiffres et des lettres (pas d'espaces).",
    ),
  password: z.string().min(8),
  email: z.string().email({
    message: "Invalid email address",
  }),
})
