import * as Select from "@radix-ui/react-select";

import { Controller, useFormContext } from "react-hook-form";
import { IoIosArrowDown as ArrowIcon } from "react-icons/io";

import { FieldErrorComponent } from "./FieldError";

interface Option {
  id: string;
  name: string;
}

export const SelectField = ({
  label,
  name,
  placeholder,
  options,
}: {
  label: string;
  name: string;
  placeholder?: string;
  options: Option[];
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Can't be empty" }}
      render={({ field, fieldState: { error } }) => (
        <div className="relative flex w-full flex-col gap-2">
          <label className="note font-bold">{label}</label>

          <Select.Root
            value={field.value?.id}
            onValueChange={(id) => {
              const selectedOption = options.find((o) => o.id === id);
              field.onChange(selectedOption);
            }}
          >
            <Select.Trigger
              aria-invalid={error ? "true" : "false"}
              className={`formField text-sm flex items-center justify-between px-4 data-[state=open]:border-accent ${
                field.value ? "text-text-primary" : "text-text-secondary/50"
              } ${
                error
                  ? "border-danger-light focus:border-danger-light"
                  : "border-lines hover:border-accent-light"
              }`}
            >
              <Select.Value placeholder={placeholder} />

              <Select.Icon>
                <ArrowIcon className="size-4 shrink-0" aria-hidden="true" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Content
              sideOffset={8}
              className="z-500 w-(--radix-select-trigger-width) animate-dropdown-in overflow-hidden rounded-lg border border-lines bg-bg-page shadow-2xl"
            >
              <Select.Viewport className="flex flex-col gap-1 p-2">
                {options.map((option) => (
                  <Select.Item
                    key={option.id}
                    value={option.id}
                    className="note flex h-9 w-full cursor-pointer items-center rounded-md px-3 outline-none transition-colors text-text-secondary data-highlighted:bg-accent-light data-highlighted:text-accent-dark data-[state=checked]:bg-accent-dark data-[state=checked]:text-text-on-accent"
                  >
                    <Select.ItemText>{option.name}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>

          <FieldErrorComponent message={error?.message} />
        </div>
      )}
    />
  );
};
