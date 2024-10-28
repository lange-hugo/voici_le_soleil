"use client"

import { z } from "zod"

import { CreateProduct } from "@/lib/schemas/CreateProduct"

import axiosInstance from "@/api/axios"
import { ServerActionResponse } from "@/lib/types"


export async function createProduct(
  data: z.infer<typeof CreateProduct>,
): Promise<ServerActionResponse<z.infer<typeof CreateProduct>, null>> {
  const validatedData = CreateProduct.safeParse({
    title: data.title,
    description: data.description,
    price: data.price,
  })
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  const res = await axiosInstance.post("api/product/", validatedData.data)
  if (Math.floor(res.status / 100) * 100 !== 200) {
    return {
      success: false,
    }
  }
  return {
    success: true,
  }
}
