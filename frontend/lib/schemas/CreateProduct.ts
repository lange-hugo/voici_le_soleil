import { z } from "zod"

export const CreateProduct = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
})
