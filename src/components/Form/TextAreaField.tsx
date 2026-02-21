import { useFormContext } from "react-hook-form";

interface TextFieldProps {
  label: string;
  name: string;
  placeholder: string;
}

export const TextAreaField = ({ label, name, placeholder }: TextFieldProps) => {
  const { register } = useFormContext();

  return (
    <section className="flex-column flex-none gap-sm">
      <label htmlFor={name} className="caption">
        {label}
      </label>
      <textarea
        id={name}
        className="h-25"
        placeholder={placeholder}
        {...register(name, {
          setValueAs: (value: string) => value.trim(),
        })}
      />
    </section>
  );
};
