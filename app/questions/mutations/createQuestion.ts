import { resolver } from "blitz"
import db from "db"
import { CreateQuestion } from "../validations"

export default resolver.pipe(resolver.zod(CreateQuestion), resolver.authorize(), async (input) => {
  const question = await db.question.create({ data: input })
  return question
})
