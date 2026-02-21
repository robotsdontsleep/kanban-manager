interface FieldErrorProps {
  message: string | undefined;
}

export const FieldErrorComponent = ({ message }: FieldErrorProps) => {
  return (
    message && (
      <span className="block relative left-1 text-xs text-danger-light animate-dropdown-in">
        {message}
      </span>
    )
  );
};
