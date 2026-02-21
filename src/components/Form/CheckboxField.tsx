import { useFormContext } from "react-hook-form";

interface TextFieldProps {
  label: string;
  name: string;
}

export const CheckBoxField = ({ label, name }: TextFieldProps) => {
  const { register } = useFormContext();

  return (
    <section className="flex-column flex-none gap-sm pb-5 relative">
      <label htmlFor={name} className="caption">
        {label}
      </label>
      <input id={name} type="checkbox" {...register(name)} />
    </section>
  );
};
