import Layout from "app/core/layouts/Layout"
import { CreateQuestionForm } from "app/questions/components/CreateQuestionForm"
import { BlitzPage, useRouter } from "blitz"

const AddQuestionPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <CreateQuestionForm
        onSuccess={() => {
          router.push("/questions")
        }}
        labels={[
          {
            id: 1,
            text: "karel",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            text: "asdfasdf",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]}
      />
    </>
  )
}

AddQuestionPage.getLayout = (page) => <Layout title="Voeg vraag toe">{page}</Layout>

export default AddQuestionPage
