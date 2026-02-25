import { type ReactNode } from 'react';
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

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
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={void methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h2 className="title">{title}</h2>

        <div className="flex flex-col gap-6">{children}</div>

        <button type="submit" className="btn-accent">
          {submitButtonText}
        </button>
      </form>
    </FormProvider>
  );
};
