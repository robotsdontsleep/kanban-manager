import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { BoardState, BoardStore, InitialState } from "./types";

const initialState: InitialState = {
  boards: [],
};

const boardStore: BoardStore = (set) => ({
  ...initialState,

  addBoard: (newBoard) =>
    set((state) => {
      state.boards.push(newBoard);
    }),
  deleteBoard: (boardId) =>
    set((state) => {
      state.boards = state.boards.filter((board) => board.boardId !== boardId);
    }),
  updateBoard: (updatedBoard) =>
    set((state) => {
      const boardIndex = state.boards.findIndex(
        (b) => b.boardId === updatedBoard.boardId,
      );

      if (boardIndex !== -1) {
        state.boards[boardIndex] = updatedBoard;
      }
    }),
});

export const useBoardStore = create<BoardState>()(
  devtools(
    persist(immer(boardStore), {
      name: "board-storage",
      partialize: (state) => ({
        boards: state.boards,
      }),
    }),
    { name: "BoardStore" },
  ),
);
