export const BoardError = () => {
  return (
    <div className="screen-full flex-column-centered">
      <h2 className="text-danger-dark text-center">Board not found</h2>
      <p className="caption">
        The board you are looking for doesn't exist or has been deleted.
      </p>
      <p className="caption">
        Please select another board from the sidebar or create a new one.
      </p>
    </div>
  );
};
