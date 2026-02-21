import { useTaskStore } from "./store";
import type { TaskState } from "./types";

export const selectTasks = (columnId: string) => (state: TaskState) => {
  return state.tasks.filter((task) => task.column?.id === columnId);
};

export const selectTask = (taskId: string) => (state: TaskState) => {
  return state.tasks.find((task) => task.taskId === taskId);
};

export const { addTask, deleteTask, updateTask } = useTaskStore.getState();
