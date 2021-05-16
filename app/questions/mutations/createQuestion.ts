import { resolver } from "blitz"
import db from "db"
import { CreateQuestion } from "../validations"

export default resolver.pipe(resolver.zod(CreateQuestion), resolver.authorize(), async (input) => {
  const question = await db.question.create({
    data: {
      ...input,
      // labels: {
      //   connect: await db.label.findMany({
      //     where: {
      //       id: { in: input.labels },
      //     },
      //   }),
      // },
    },
  })
  return question
})
