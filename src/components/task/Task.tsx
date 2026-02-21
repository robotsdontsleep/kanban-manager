import type { SubTask, Task as TaskType } from "@/store/task/types";

export const Task = ({ taskName, subtasks }: TaskType) => {
  const completedSubtasks = subtasks.filter(
    (subTask: SubTask) => subTask.isCompleted === true,
  );

  const subtaskText = subtasks.length
    ? `${completedSubtasks.length} of ${subtasks.length}`
    : "any subtasks";
  return (
    <div className="flex-column justify-center gap-md w-full min-h-[100px] h-auto p-lg rounded-lg bg-bg-page border-2 border-lines shadow-md transition-custom hover:border-accent">
      <h3 className="wrap-break-word">{taskName}</h3>
      <p className="caption wrap-break-word">{subtaskText}</p>
    </div>
  );
};
