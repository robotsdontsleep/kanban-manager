export const BoardError = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h2 className="title text-danger-dark md:text-3xl">Board not found</h2>
      <div className="flex flex-col gap-2">
        <p className="subtitle">
          The board you are looking for doesn't exist or has been deleted.
        </p>
        <p className="note">
          Please select another board from the sidebar or create a new one.
        </p>
      </div>
    </div>
  );
};
