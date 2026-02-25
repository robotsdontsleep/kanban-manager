import { useFormContext } from "react-hook-form";
import { FieldErrorComponent } from "./FieldError";

interface TextFieldProps {
  label: string;
  name: string;
  placeholder: string;
}

export const TextAreaField = ({ label, name, placeholder }: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={name} className="note font-bold">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={`formField h-28 resize-none py-2 ${
          error ? "border-danger-light focus:border-danger-light" : ""
        }`}
        {...register(name, {
          setValueAs: (value: string) => value.trim(),
        })}
      />
      <FieldErrorComponent message={error?.message as string} />
    </div>
  );
};
