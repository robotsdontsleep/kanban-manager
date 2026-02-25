import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

import { MdDashboard as BoardIcon } from "react-icons/md";

import { selectBoards } from "@/store/board/selectors";
import { useBoardStore } from "@/store/board/store";

export const BoardList = () => {
  const { t } = useTranslation();
  const boards = useBoardStore(selectBoards);
  const totalBoards = boards.length;

  return (
    <nav className="flex h-full flex-col overflow-hidden">
      <h2 className="note flex-none pl-6 uppercase opacity-60 md:pl-8">
        {t("boards.all_boards", { count: totalBoards })}
      </h2>

      <Link
        to="?modal=add-board"
        className="subtitle text-accent-dark flex h-12 flex-none items-center gap-3 whitespace-nowrap pl-6 transition-opacity hover:opacity-70 md:gap-4 md:pl-8"
        aria-label="Create a new board"
      >
        <BoardIcon className="size-5 shrink-0" aria-hidden="true" />
        <span className="font-bold">{t("boards.create_new")}</span>
      </Link>

      <ul className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto pr-4 md:pr-6">
        {boards.map((board) => (
          <li key={board.boardId} className="flex-none">
            <NavLink
              to={`/${board.boardId}`}
              className={({ isActive }) =>
                `subtitle flex h-12 items-center gap-3 rounded-r-full pl-6 transition-all md:gap-4 md:pl-8 ${
                  isActive
                    ? "bg-accent-dark text-text-on-accent"
                    : "text-text-secondary hover:bg-accent-light hover:text-accent-dark"
                }`
              }
              aria-label={`Go to board: ${board.boardName}`}
            >
              <BoardIcon className="size-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{board.boardName}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
