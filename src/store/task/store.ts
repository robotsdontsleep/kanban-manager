import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { TaskState, TaskStore, InitialState, Task } from "./types";

const initialState: InitialState = {
  tasks: [],
};

const taskStore: TaskStore = (set) => ({
  ...initialState,

  addTask: (newTask) =>
    set((state) => {
      state.tasks.push(newTask);
    }),
  deleteTask: (taskId) =>
    set((state) => {
      state.tasks = state.tasks.filter((task) => task.taskId !== taskId);
    }),
  updateTask: (updatedTask: Task) =>
    set((state) => {
      const taskIndex = state.tasks.findIndex(
        (t) => t.taskId === updatedTask.taskId,
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    }),
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(taskStore), {
      name: "task-storage",
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    }),
    { name: "TaskStore" },
  ),
);
