import { Link, NavLink } from "react-router-dom";
import { MdDashboard as BoardIcon } from "react-icons/md";

import { useBoardStore } from "@/store/board/store";
import { selectBoards } from "@/store/board/selectors";

export const BoardList = () => {
  const boards = useBoardStore(selectBoards);
  const totalBoards = boards.length;

  return (
    <nav className="flex-column flex-1 min-h-0 pr-xxl">
      <h6 className="text-xs font-bold text-text-secondary uppercase px-xl mb-md flex-none">
        {`All boards (${totalBoards})`}
      </h6>

      <ul className="flex-column flex-initial min-h-0 overflow-y-auto">
        {boards.map((board) => (
          <li key={board.boardId}>
            <NavLink
              to={`/${board.boardId}`}
              className={({ isActive }) =>
                `flex items-center flex-auto min-h-0 gap-sm h-12 w-full pl-xl txt-md
                 border-2 border-l-0 border-transparent rounded-r-4xl transition-custom
                 ${
                   isActive
                     ? "bg-accent-dark text-text-on-accent brightness-110"
                     : "hover:text-text-primary hover:bg-accent-light hover:border-accent-lines"
                 }`
              }
            >
              <BoardIcon />
              {board.boardName}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link
        to="?modal=add-board"
        className="flex items-center w-full h-14 p-xl gap-sm text-accent-dark subtitle transition-custom flex-none hover:brightness-110"
      >
        <BoardIcon /> + Create New Board
      </Link>
    </nav>
  );
};
