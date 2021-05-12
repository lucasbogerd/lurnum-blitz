import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateLabel = z
  .object({
    id: z.number(),
    text: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateLabel),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const label = await db.label.update({ where: { id }, data })

    return label
  }
)
