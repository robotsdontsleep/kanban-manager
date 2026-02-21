import { useBoardStore } from "./store";
import type { BoardState } from "./types";

export const selectBoards = (state: BoardState) => state.boards;
export const selectBoard = (boardId: string) => (state: BoardState) => {
  return state.boards.find((b) => b.boardId === boardId);
};

export const { addBoard, updateBoard, deleteBoard } = useBoardStore.getState();
