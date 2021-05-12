import { Form, FORM_ERROR } from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import { useMutation } from "blitz"
import createQuestion from "../mutations/createQuestion"
import { CreateQuestion } from "../validations"
type CreateQuestionFormProps = {
  onSuccess?: () => void
}

export const CreateQuestionForm = (props: CreateQuestionFormProps) => {
  const [createQuestionMutation] = useMutation(createQuestion)

  return (
    <>
      <h1>Create question</h1>

      <Form
        submitText="Create question"
        schema={CreateQuestion}
        initialValues={{ text: "", labels: [] }}
        onSubmit={async (values) => {
          try {
            await createQuestionMutation(values)
            props.onSuccess?.()
          } catch (error) {
            return { [FORM_ERROR]: "Wat doe jij nou? - " + error.toString() }
          }
        }}
      >
        <LabeledTextField name="text" label="Question text" placeholder="Question text" />
      </Form>
    </>
  )
}
