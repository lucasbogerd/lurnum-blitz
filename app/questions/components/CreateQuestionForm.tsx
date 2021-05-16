import { Form, FORM_ERROR } from "app/core/components/Form"
import { LabeledCheckboxField } from "app/core/components/LabeledCheckboxField"
import LabeledTextField from "app/core/components/LabeledTextField"
import { useMutation } from "blitz"
import { Label } from "db"
import createQuestion from "../mutations/createQuestion"
import { CreateQuestion } from "../validations"

type CreateQuestionFormProps = {
  onSuccess?: () => void
  labels: Label[]
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
        <LabeledTextField id="0" name="text" label="Question text" placeholder="Question text" />
        {props.labels.map((label) => {
          return (
            <LabeledCheckboxField
              value={label.id}
              name={label.text}
              label={label.text}
              key={label.id.toString()}
              type="checkbox"
            />
          )
        })}
      </Form>
    </>
  )
}
