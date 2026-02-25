import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { selectBoards } from '@/store/board/selectors';
import { useBoardStore } from '@/store/board/store';

export const useActiveBoard = () => {
  const navigate = useNavigate();

  const { boardId } = useParams();
  const boards = useBoardStore(selectBoards);
  const activeBoard = boards.find((b) => b.boardId === boardId);
  const boardExisted = useRef(false);

  useEffect(() => {
    if (activeBoard) {
      localStorage.setItem('activeBoard', activeBoard.boardId);
      boardExisted.current = true;
      return;
    }

    if (boardExisted.current) {
      const fallbackBoard = boards.find((b) => b.boardId !== boardId);

      if (fallbackBoard) {
        localStorage.setItem('activeBoard', fallbackBoard.boardId);
        void navigate(`/${fallbackBoard.boardId}`, { replace: true });
        return;
      } else {
        localStorage.removeItem('activeBoard');
        void navigate('/', { replace: true });
        boardExisted.current = false;
        return;
      }
    }

    if (!boardExisted.current) {
      localStorage.removeItem('activeBoard');
      return;
    }
  }, [boardId, boards, activeBoard, navigate]);

  return activeBoard;
};
