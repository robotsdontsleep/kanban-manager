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
    <section className="flex-column flex-none gap-sm pb-5 relative">
      <label htmlFor={name} className="caption">
        {label}
      </label>
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        className={error ? "border-2 border-danger-light" : ""}
        {...register(name, {
          required: "Can't be empty",
          setValueAs: (value: string) => value.trim(),
          pattern: {
            value: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s_.\-/]+$/,
            message: "Use letters and numbers only(e.g. 'Todo')",
          },
        })}
      />
      <FieldErrorComponent message={error?.message as string} />
    </section>
  );
};
