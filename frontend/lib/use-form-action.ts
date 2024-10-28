import { FieldValues, UseFormProps, useForm } from "react-hook-form"

// https://github.com/react-hook-form/react-hook-form/issues/10391#issuecomment-1888225849

export function useFormAction<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(props?: UseFormProps<TFieldValues, TContext>) {
  const form = useForm<TFieldValues, TContext, TTransformedValues>(props)

  const submitAction = (onAction: (formData: TFieldValues) => void) => {
    console.log(form.formState)
    if (form.formState.isValid) {
      return { action: () => onAction(form.getValues()) }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { onSubmit: form.handleSubmit(onAction as any) }
  }

  return {
    ...form,
    submitAction,
  }
}