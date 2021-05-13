import * as z from "zod"

const text = z.string().min(3).max(20)

export const CreateLabel = z
  .object({
    text,
  })
  .nonstrict()

export const DeleteLabel = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export const UpdateLabel = z
  .object({
    id: z.number(),
    text: z.string(),
  })
  .nonstrict()
