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
      />
    </>
  )
}

AddQuestionPage.getLayout = (page) => <Layout title="Voeg vraag toe">{page}</Layout>

export default AddQuestionPage
