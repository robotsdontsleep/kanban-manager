import { useFormContext } from "react-hook-form";

import { FieldErrorComponent } from "./FieldError";

interface TextFieldProps {
  label: string;
  name: string;
  placeholder: string;
}

export const TextField = ({ label, name, placeholder }: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="note font-bold">
        {label}
      </label>
      <input
        {...register(name, {
          required: "Can't be empty",
          setValueAs: (value: string) => value.trim(),
          pattern: {
            value: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s_.\-/]+$/,
            message: "Invalid format",
          },
        })}
        id={name}
        type="text"
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={`formField ${
          error ? "border-danger-light focus:border-danger-light" : ""
        }`}
      />
      <FieldErrorComponent message={error?.message as string} />
    </div>
  );
};
