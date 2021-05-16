import * as z from "zod"

const text = z.string().min(10).max(200)

export const CreateQuestion = z
  .object({
    text,
    labels: z.array(z.number()).min(1).max(3),
  })
  .nonstrict()
