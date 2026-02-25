import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { Link } from "react-router-dom";

import { selectTasks } from "@/store/task/selectors";
import { useTaskStore } from "@/store/task/store";

import { Task } from "./Task";

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 121) + 100;
  const g = Math.floor(Math.random() * 121) + 100;
  const b = Math.floor(Math.random() * 121) + 100;
  return `rgb(${r}, ${g}, ${b})`;
};

export const TaskList = ({ id, name }: { id: string; name: string }) => {
  const tasks = useTaskStore(useShallow(selectTasks(id)));
  const dotColor = useMemo(() => getRandomColor(), []);

  return (
    <article className="group flex h-full w-[280px] shrink-0 flex-col gap-6 md:w-[300px]">
      <h3 className="flex items-center gap-3">
        <span
          className="size-4 shrink-0 rounded-full shadow-xs"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
        <span className="note font-bold uppercase tracking-widest transition-colors group-hover:text-text-primary">
          {`${name} (${tasks.length})`}
        </span>
      </h3>

      <div
        className={`flex flex-1 flex-col gap-5 rounded-lg transition-colors ${
          tasks.length
            ? "bg-transparent"
            : "border-2 border-dashed border-lines bg-accent-light"
        }`}
      >
        {tasks.map((task) => (
          <Link
            to={`${task.taskId}?modal=edit-task`}
            state={task}
            key={task.taskId}
            className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent-dark"
            aria-label={`View task: ${task.taskName}`}
          >
            <Task {...task} />
          </Link>
        ))}
      </div>
    </article>
  );
};
