import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import { CreateLabelForm } from "../../components/CreateLabelForm"

const AddLabelPage: BlitzPage = () => {
  return (
    <div>
      <CreateLabelForm
        onSuccess={() => {
          console.log("lekker gewerkt pik")
        }}
      />
    </div>
  )
}

AddLabelPage.getLayout = (page) => <Layout title="Voeg label toe">{page}</Layout>

export default AddLabelPage
