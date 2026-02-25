interface FieldErrorProps {
  message: string | undefined;
}

export const FieldErrorComponent = ({ message }: FieldErrorProps) => {
  return message ? (
    <span
      role="alert"
      className="note block text-danger-light animate-dropdown-in"
    >
      {message}
    </span>
  ) : null;
};
