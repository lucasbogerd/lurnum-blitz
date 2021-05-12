import * as z from "zod"

const text = z.string().min(3).max(20)

export const CreateLabel = z
  .object({
    text,
  })
  .nonstrict()
