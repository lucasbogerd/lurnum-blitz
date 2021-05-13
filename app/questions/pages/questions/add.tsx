import Layout from "app/core/layouts/Layout"
import getLabels from "app/labels/queries/getLabels"
import { CreateQuestionForm } from "app/questions/components/CreateQuestionForm"
import { BlitzPage, usePaginatedQuery, useRouter } from "blitz"

const AddQuestionPage: BlitzPage = () => {
  const router = useRouter()
  const [{ labels }] = usePaginatedQuery(getLabels, {
    orderBy: { text: "desc" },
    take: 10,
  })

  const now: Date = new Date()

  return (
    <>
      <CreateQuestionForm
        onSuccess={() => {
          router.push("/questions")
        }}
        labels={[
          {
            id: 1,
            createdAt: now,
            updatedAt: now,
            text: "asdf",
          },
        ]}
        // labels={labels}
      />
    </>
  )
}

AddQuestionPage.getLayout = (page) => <Layout title="Voeg vraag toe">{page}</Layout>

export default AddQuestionPage
