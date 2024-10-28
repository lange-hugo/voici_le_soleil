"use client"

import { z } from "zod"

import { ContactUsSchema } from "@/lib/schemas/ContactUsFrom"

import axiosInstance from "@/api/axios"
import { ServerActionResponse } from "@/lib/types"


export async function createMessage(
  data: z.infer<typeof ContactUsSchema>,
): Promise<ServerActionResponse<z.infer<typeof ContactUsSchema>, null>> {
  const validatedData = ContactUsSchema.safeParse({
    date: data.date,
    place: data.place,
    coupleNames: data.coupleNames,
    messageFrom: data.messageFrom,
    senderName: data.senderName,
    subject: data.subject,
    email: data.email,
    message: data.message,
  })
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    }
  }
  try {
    axiosInstance.post("api/message/", {
      date: validatedData.data.date,
      place: validatedData.data.place,
      couple_names: validatedData.data.coupleNames,
      message_from: validatedData.data.messageFrom,
      sender_name: validatedData.data.senderName,
      subject: validatedData.data.subject,
      email: validatedData.data.email,
      message: validatedData.data.message,
    })
    return {
      success: true,
    }
  } catch {
    return {
      success: false,
    }
  }
}
