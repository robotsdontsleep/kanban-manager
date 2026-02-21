import {
  get,
  useFieldArray,
  useFormContext,
  type FieldError,
  type UseFormRegisterReturn,
} from "react-hook-form";

import { RxCross2 } from "react-icons/rx";

import { FieldErrorComponent } from "./FieldError";

interface MultiTextFieldProps {
  id: string;
  label: string;
  name: string;
  buttonText: string;
  placeholder: string;
  isRequired?: boolean;
}

export const MultiTextField = ({
  id,
  label,
  name,
  buttonText,
  placeholder = "",
  isRequired = false,
}: MultiTextFieldProps) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <section className="flex-column flex-1 min-h-0 gap-sm">
      <h3 className="flex flex-none caption">{label}</h3>
      <ul className="flex-column flex-1 min-h-0 overflow-y-auto gap-md">
        {fields.map((field, index) => {
          const fieldError = get(errors, `${name}.${index}.name`);

          return (
            <li key={field.id}>
              <Field
                placeholder={placeholder}
                error={fieldError}
                register={register(`${name}.${index}.name`, {
                  required: isRequired ? "Can't be empty" : false,
                  setValueAs: (value: string) => value.trim(),
                  pattern: {
                    value: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s_.\-/]+$/,
                    message: "Use letters and numbers only(e.g. 'Todo')",
                  },
                })}
                onRemove={fields.length > 1 ? () => remove(index) : undefined}
              />
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="btn-base note h-10 mt-sm"
        onClick={() => append({ name: "", id: `${id}-${Date.now()}` })}
      >
        {buttonText}
      </button>
    </section>
  );
};

interface FieldProps {
  error: FieldError;
  placeholder: string;
  register: UseFormRegisterReturn;
  onRemove?: () => void;
}

const Field = ({ error, register, onRemove, placeholder }: FieldProps) => {
  return (
    <div className="flex-column gap-sm">
      <div className="flex items-center w-full relative">
        <input
          className={`pr-10 ${error ? "border-2 border-danger-light" : ""}`}
          placeholder={placeholder}
          {...register}
        />
        {onRemove && (
          <button
            type="button"
            className="absolute right-3 text-text-secondary cursor-pointer hover:text-danger-dark transition-colors"
            onClick={onRemove}
          >
            <RxCross2 size={20} />
          </button>
        )}
      </div>
      <FieldErrorComponent message={error?.message} />
    </div>
  );
};
