import type { SubTask, Task as TaskType } from "@/store/task/types";

export const Task = ({ taskName, subtasks }: TaskType) => {
  const completedSubtasks = subtasks.filter(
    (subTask: SubTask) => subTask.isCompleted === true,
  );

  const subtaskText = subtasks.length
    ? `${completedSubtasks.length} of ${subtasks.length} subtasks`
    : "No subtasks";

  return (
    <div className="group flex min-h-[100px] w-full flex-col justify-center gap-2 rounded-lg bg-bg-page px-4 py-6 shadow-sm ring-1 ring-lines transition-all duration-200 hover:ring-2 hover:ring-accent-dark active:scale-[0.98]">
      <h3 className="subtitle wrap-break-word font-bold text-text-primary group-hover:text-accent-dark">
        {taskName}
      </h3>
      <p className="note font-bold">{subtaskText}</p>
    </div>
  );
};
