import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard, selectBoard } from "@/store/board/selectors";
import { useBoardStore } from "@/store/board/store";
import { useTaskStore } from "@/store/task/store";
import { deleteTask, selectTask } from "@/store/task/selectors";

interface Props {
  onClose: () => void;
}

export const ConfirmDelete = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const { boardId, taskId } = useParams();

  const activeBoard = useBoardStore(selectBoard(boardId!));

  const activeTask = useTaskStore(selectTask(taskId!));

  const type = taskId ? "task" : "board";

  return (
    <div className="flex-column gap-lg">
      <h2 className="text-danger-dark">Delete this {type}?</h2>
      <p className="caption">
        Are you sure you want to delete the{" "}
        <span className="text-text-primary font-bold">
          {taskId ? activeTask?.taskName : activeBoard?.boardName}
        </span>{" "}
        {type}? This action will remove all{" "}
        {type === "board" ? "columns and tasks" : "subtasks"} and cannot be
        reversed.
      </p>

      <div className="flex items-center justify-end gap-lg">
        <button
          className="btn-danger h-10 px-lg py-sm w-auto"
          onClick={() => {
            if (taskId) {
              deleteTask(taskId);
            } else if (boardId) {
              deleteBoard(boardId);
            }
            onClose();
            navigate(`/${boardId}`);
          }}
        >
          Delete
        </button>
        <button
          className="btn-accent txt-xs h-10 px-lg py-sm w-auto"
          onClick={() => navigate(`/${boardId}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
