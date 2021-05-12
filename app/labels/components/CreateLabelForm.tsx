import { useMutation } from "blitz"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"

import createLabel from "app/labels/mutations/createLabel"
import { CreateLabel } from "app/labels/validations"

type CreateLabelFormProps = {
  onSuccess?: () => void
}

export const CreateLabelForm = (props: CreateLabelFormProps) => {
  const [createLabelMutation] = useMutation(createLabel)

  return (
    <div>
      <h1>Create label</h1>

      <Form
        submitText="Create label"
        schema={CreateLabel}
        initialValues={{ text: "" }}
        onSubmit={async (values) => {
          try {
            await createLabelMutation(values)
            props.onSuccess?.()
          } catch (error) {
            return { [FORM_ERROR]: "Wat doe jij nou? - " + error.toString() }
          }
        }}
      >
        <LabeledTextField name="text" label="Label text" placeholder="Label text" />
      </Form>
    </div>
  )
}
