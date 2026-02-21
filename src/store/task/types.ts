import type { StateCreator } from "zustand";
import type { Column } from "../board/types";

export interface SubTask {
  name: string | null;
  isCompleted: boolean;
}

export interface Task {
  taskId: string | null;
  taskName: string | null;
  taskDescription: string | null;
  subtasks: SubTask[];
  column: Column | null;
}

export interface InitialState {
  tasks: Task[];
}

interface Actions {
  addTask: (newTask: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedBoard: Task) => void;
}

export interface TaskState extends InitialState, Actions {}

export type TaskStore = StateCreator<
  TaskState,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never],
  ]
>;
