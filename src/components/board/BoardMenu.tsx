import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const BoardMenu = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <div
      className="absolute top-14 right-0 z-50 w-48 rounded-lg border border-lines bg-bg-page shadow-xl md:top-20"
      role="menu"
      aria-label="Board options"
    >
      <ul className="flex flex-col p-2" onClick={onClose}>
        <li role="none">
          <Link
            to="?modal=edit-board"
            role="menuitem"
            className="caption block w-full rounded-md px-4 py-2 transition-colors hover:bg-accent-light hover:text-accent-dark active:scale-95"
          >
            {t("boards.edit_board")}
          </Link>
        </li>
        <li role="none">
          <Link
            to="?modal=delete-board"
            role="menuitem"
            className="caption block w-full rounded-md px-4 py-2 text-danger-light transition-colors hover:bg-danger-light/10 hover:text-danger-dark active:scale-95"
          >
            {t("boards.delete_board")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
