import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SelectField } from "../Form/SelectField";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useBoardStore } from "@/store/board/store";
import { selectBoard } from "@/store/board/selectors";
import { Form } from "../Form/Form";
import { updateTask } from "@/store/task/selectors";
import type { Task } from "@/store/task/types";

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
    <>
      <Form
        defaultValues={state || {}}
        onSubmit={submit}
        title={state?.taskName || ""}
        submitButtonText="Save Changes"
      >
        <div className="flex-column gap-xs">
          <h3 className="caption">Description</h3>
          <p className="max-h-[400px] overflow-y-auto text-base text-text-primary w-full pb-s bg-transparent wrap-break-word">
            {state?.taskDescription
              ? state.taskDescription
              : "No description provided for this task."}
          </p>
        </div>

        <SubtasksList />

        <SelectField
          label="Status"
          name="column"
          options={activeBoard?.columns || []}
        />
      </Form>
      <Link to={`?modal=delete-task`} className="btn-danger h-10 mt-sm">
        Delete Task
      </Link>
    </>
  );
};

const SubtasksList = () => {
  const { register, control } = useFormContext<SubTasksForm>();
  const { fields } = useFieldArray({
    control,
    name: "subtasks",
  });

  return (
    <div className="flex-column gap-sm">
      <label className="flex flex-none caption">Subtasks</label>

      {fields.length > 0 ? (
        <div className="flex-column max-h-[210px]  gap-md overflow-y-auto">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-md">
              <input
                type="checkbox"
                {...register(`subtasks.${index}.isCompleted`)}
                className="appearance-none w-sm h-sm bg-bg-page border border-lines rounded-md 
                cursor-pointer transition-custom
               hover:bg-accent-light hover:border-accent
               checked:bg-accent checked:border-accent"
              />
              <p className="caption text-text-primary">{field.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-base text-text-primary w-full pb-s bg-transparent wrap-break-word">
          No subtasks assigned to this task.
        </p>
      )}
    </div>
  );
};
