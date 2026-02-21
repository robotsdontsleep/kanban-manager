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
        <div className="flex-column gap-sm w-full">
          <label className="caption">{label}</label>

          <Select.Root
            value={field.value?.id}
            onValueChange={(id) => {
              const selectedOption = options.find((o) => o.id === id);
              field.onChange(selectedOption);
            }}
          >
            <Select.Trigger
              className={`
                transition-custom box-border h-10 w-full bg-transparent border-2 rounded-lg flex-between px-md data-[state=open]:border-accent outline-none
              ${field.value ? "text-text-primary" : "text-text-secondary/50"}
              ${error ? "border-danger-light hover:border-danger-light" : "border-lines hover:border-accent-light"}`}
            >
              <Select.Value placeholder={placeholder} />

              <Select.Icon>
                <ArrowIcon className="icon w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Content
              position="popper"
              sideOffset={8}
              className="w-(--radix-select-trigger-width) bg-bg-page border-2 border-accent rounded-lg shadow-2xl animate-dropdown-in z-10"
            >
              <Select.Viewport className="p-sm flex-column w-full gap-sm">
                {options.map((option) => (
                  <Select.Item
                    key={option.id}
                    value={option.id}
                    className="
                        w-full h-[38px] flex items-center txt-sm p-sm rounded-md transition-custom cursor-pointer outline-none
                        text-text-secondary border-transparent
                        data-highlighted:bg-accent-light data-highlighted:text-text-primary data-highlighted:border-accent
                        data-[state=checked]:bg-accent-dark data-[state=checked]:text-text-on-accent data-[state=checked]:border-accent-dark
                      "
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
