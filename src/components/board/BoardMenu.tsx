import { Link } from "react-router-dom";

export const BoardMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-22 right-7 z-50 w-48 rounded-lg bg-bg-page border border-lines shadow-md animate-dropdown-in">
      <ul className="flex-column p-md gap-sm" onClick={onClose}>
        <li>
          <Link
            to="?modal=edit-board"
            className="block w-full no-underline caption p-sm rounded-md transition-custom border-2 border-transparent hover:bg-accent hover:text-accent-dark hover:border-accent-lines active:scale-98"
          >
            Edit Board
          </Link>
        </li>
        <li>
          <Link
            to="?modal=delete-board"
            className="block w-full no-underline caption p-sm rounded-md transition-custom border-2 border-transparent active:scale-98 hover:bg-danger-light/10 hover:text-danger-dark"
          >
            Delete Board
          </Link>
        </li>
      </ul>
    </div>
  );
};
