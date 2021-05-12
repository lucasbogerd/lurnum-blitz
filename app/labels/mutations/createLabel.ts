import { resolver } from "blitz"
import db from "db"
import { CreateLabel } from "../validations"

export default resolver.pipe(resolver.zod(CreateLabel), resolver.authorize(), async (input) => {
  const label = await db.label.create({ data: input })
  return label
})
