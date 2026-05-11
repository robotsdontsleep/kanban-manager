import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai';

import { useActiveBoard } from '@/hooks/useActiveBoard';

import { BoardMenu } from './BoardMenu';
import { BoardError } from './BoardError';
import { TaskList } from '../task/TaskList';

export const Board = () => {
  const { t } = useTranslation();

  const activeBoard = useActiveBoard();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  if (!activeBoard) {
    return <BoardError />;
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-16 w-full shrink-0 items-center justify-between gap-4 border-b border-lines bg-bg-page px-4 md:h-20 md:px-6 lg:h-24">
        <h2 className="title truncate">{activeBoard.boardName}</h2>

        <div className="relative flex shrink-0 items-center gap-4">
          <div className="relative flex shrink-0 items-center gap-4">
            <Link
              to="?modal=add-task"
              className="btn-accent hidden h-12 px-6 md:flex md:w-auto"
              aria-label="Add new task"
            >
              {t('tasks.create_new')}
            </Link>

            <Link
              to="?modal=add-task"
              className="btn-accent flex size-8 items-center justify-center pb-1 text-2xl md:hidden"
              aria-label="Add new task"
            >
              +
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center p-1"
            aria-label="Open board menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            <MenuIcon
              className="size-6 text-text-secondary transition-colors hover:text-text-primary md:size-8"
              aria-hidden="true"
            />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeMenu} aria-hidden="true" />
              <BoardMenu onClose={closeMenu} />
            </>
          )}
        </div>
      </header>

      <div className="flex flex-1 gap-6 overflow-x-auto bg-bg-page p-4 md:p-6">
        {activeBoard.columns.map((column) => (
          <TaskList key={column.id} {...column} />
        ))}

        <Link
          to="?modal=edit-board"
          className="subtitle mt-10 flex w-[280px] shrink-0 items-center justify-center rounded-lg bg-linear-to-b from-accent-light to-transparent text-center transition-all hover:text-accent-dark md:w-[300px]"
          aria-label="Add new column to board"
        >
          {t('boards.new_column')}
        </Link>
      </div>
    </section>
  );
};
