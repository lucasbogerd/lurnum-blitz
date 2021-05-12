import Layout from "app/core/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import { CreateLabelForm } from "app/labels/components/CreateLabelForm"

const AddLabelPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <CreateLabelForm
        onSuccess={() => {
          router.push("/labels")
        }}
      />
    </>
  )
}

AddLabelPage.getLayout = (page) => <Layout title="Voeg label toe">{page}</Layout>

export default AddLabelPage
