import { Link } from "react-router-dom";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";

import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useState } from "react";

import { BoardMenu } from "./BoardMenu";
import { BoardError } from "./BoardError";
import { TaskList } from "../task/TaskList";

export const Board = () => {
  const activeBoard = useActiveBoard();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  if (!activeBoard) {
    return <BoardError />;
  }

  return (
    <section className="flex-column flex-1 min-w-0 transition-custom">
      <header className="flex-between gap-xxl h-25 w-full border-b border-lines p-xl">
        <h2>{activeBoard.boardName}</h2>

        <div className="flex flex-none gap-lg">
          <Link to="?modal=add-task" className="btn-accent h-12 flex-1 px-xxl ">
            + Add New Task
          </Link>

          <button onClick={() => setIsMenuOpen(true)}>
            <MenuIcon className="w-8 h-8 text-text-secondary transition-custom hover:text-text-primary" />
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-transparent z-40"
                onClick={closeMenu}
              />
              <BoardMenu onClose={closeMenu} />
            </>
          )}
        </div>
      </header>
      <div className="flex flex-1 overflow-x-auto p-xl pt-md gap-lg bg-accent-light">
        {activeBoard.columns.map((column) => (
          <TaskList key={column.id} {...column} />
        ))}

        <Link
          to="?modal=edit-board"
          className="centered rounded-lg 
                       w-75 mt-[43px] shrink-0
                       bg-linear-to-b from-bg-page to-transparent 
                       subtitle no-underline outline-none
                       transition-custom hover:text-text-primary"
        >
          + New Column
        </Link>
      </div>
    </section>
  );
};
