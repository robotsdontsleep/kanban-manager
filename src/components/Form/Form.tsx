import { type ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  title: string;
  submitButtonText: string;
  children: ReactNode;
}

export const Form = <T extends FieldValues>({
  defaultValues,
  onSubmit,
  title,
  submitButtonText,
  children,
}: FormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex-column max-h-[80vh] gap-md"
      >
        <h2 className="flex flex-none mb-xl">{title}</h2>
        {children}
        <button type="submit" className="btn-accent w-full">
          {submitButtonText}
        </button>
      </form>
    </FormProvider>
  );
};
