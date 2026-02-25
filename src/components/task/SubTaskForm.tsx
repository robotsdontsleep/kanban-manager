import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useBoardStore } from "@/store/board/store";
import { selectBoard } from "@/store/board/selectors";
import { Form } from "../Form/Form";
import { updateTask } from "@/store/task/selectors";
import type { Task } from "@/store/task/types";
import { SelectField } from "../Form/SelectField";

interface Subtask {
  id: string;
  name: string;
  isCompleted: boolean;
}

interface SubTasksForm {
  subtasks: Subtask[];
}

export const SubTaskForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { boardId } = useParams();
  const activeBoard = useBoardStore(selectBoard(boardId!));

  const submit = (taskData: Task) => {
    updateTask(taskData);
    navigate(`/${boardId}`);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Form
        defaultValues={state || {}}
        onSubmit={submit}
        title={state?.taskName || "Task Details"}
        submitButtonText="Save Changes"
      >
        <div className="flex flex-col gap-2">
          <h3 className="note font-bold">Description</h3>
          <p className="note max-h-40 overflow-y-auto wrap-break-word leading-relaxed">
            {state?.taskDescription || "No description provided for this task."}
          </p>
        </div>

        <SubtasksList />

        <SelectField
          label="Current Status"
          name="column"
          options={activeBoard?.columns || []}
        />
      </Form>

      <Link
        to="?modal=delete-task"
        state={state}
        className="btn-danger h-10 font-bold"
      >
        Delete Task
      </Link>
    </div>
  );
};

const SubtasksList = () => {
  const { register, control, watch } = useFormContext<SubTasksForm>();
  const { fields } = useFieldArray({
    control,
    name: "subtasks",
  });

  const watchedSubtasks = watch("subtasks");
  const completedCount =
    watchedSubtasks?.filter((s) => s.isCompleted).length || 0;

  return (
    <div className="flex flex-col gap-3">
      <label className="note font-bold">
        Subtasks ({completedCount} of {fields.length})
      </label>

      {fields.length > 0 ? (
        <div className="custom-scrollbar flex max-h-52 flex-col gap-2 overflow-y-auto pr-2">
          {fields.map((field, index) => (
            <label
              key={field.id}
              className="flex cursor-pointer items-center gap-4 rounded-md bg-bg-page p-3 transition-colors hover:bg-accent-light"
            >
              <input
                type="checkbox"
                {...register(`subtasks.${index}.isCompleted`)}
                className="size-4 shrink-0 cursor-pointer rounded border-lines bg-bg-page accent-accent-dark focus:ring-0 focus:ring-offset-0"
              />
              <span
                className={`note font-bold transition-all ${
                  watchedSubtasks?.[index]?.isCompleted
                    ? "text-text-secondary line-through opacity-50"
                    : "text-text-primary"
                }`}
              >
                {field.name}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <p className="note italic">No subtasks assigned.</p>
      )}
    </div>
  );
};
