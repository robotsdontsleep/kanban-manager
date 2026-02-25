import {
  get,
  useFieldArray,
  useFormContext,
  type FieldError,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import { RxCross2 } from 'react-icons/rx';

import { FieldErrorComponent } from './FieldError';

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
  placeholder = '',
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
    <section className="flex flex-col gap-2">
      <h3 className="note font-bold">{label}</h3>
      <ul className="custom-scrollbar flex max-h-40 flex-col gap-3 overflow-y-auto pr-2">
        {fields.map((field, index) => {
          const fieldError = get(errors, `${name}.${index}.name`) as FieldError;

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
                    message: 'Invalid format',
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
        className="btn-base note h-10 bg-accent-light font-bold text-accent-dark hover:brightness-105 mt-4"
        onClick={() => append({ name: '', id: `${id}-${Date.now()}` })}
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
    <div className="relative flex flex-col gap-2">
      <div className="relative flex w-full items-center">
        <input
          type="text"
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          className={`formField pr-10 ${
            error ? 'border-danger-light focus:border-danger-light' : ''
          }`}
          {...register}
        />
        {onRemove && (
          <button
            type="button"
            className="absolute right-3 flex items-center justify-center text-text-secondary transition-colors hover:text-danger-dark"
            onClick={onRemove}
            aria-label="Remove item"
          >
            <RxCross2 size={20} aria-hidden="true" />
          </button>
        )}
      </div>
      <FieldErrorComponent message={error?.message} />
    </div>
  );
};
