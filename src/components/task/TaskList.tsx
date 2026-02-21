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
    <article className="group flex-column w-75 h-full shrink-0 gap-md">
      <h3 className="flex items-center gap-sm">
        <span
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <span className="caption transition-custom group-hover:text-text-primary">
          {`${name}(${tasks.length})`}
        </span>
      </h3>

      <div
        className={`flex-column flex-1 gap-xl rounded-lg border-3 overflow-y-auto
            ${tasks.length ? "border-none" : " border-accent-light"}`}
      >
        {tasks.map((task) => (
          <Link
            to={`${task.taskId}?modal=edit-task`}
            state={task}
            key={task.taskId}
          >
            <Task {...task} />
          </Link>
        ))}
      </div>
    </article>
  );
};
