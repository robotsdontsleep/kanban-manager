import type { StateCreator } from "zustand";

export interface Column {
  id: string;
  name: string;
}

export interface Board {
  boardId: string;
  boardName: string;
  columns: Column[];
}

export interface InitialState {
  boards: Board[];
}

interface Actions {
  addBoard: (newBoard: Board) => void;
  deleteBoard: (boardId: string) => void;
  updateBoard: (updatedBoard: Board) => void;
}

export interface BoardState extends InitialState, Actions {}

export type BoardStore = StateCreator<
  BoardState,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never],
  ]
>;
