import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard, selectBoard } from "@/store/board/selectors";
import { useBoardStore } from "@/store/board/store";
import { useTaskStore } from "@/store/task/store";
import { deleteTask, selectTask } from "@/store/task/selectors";

interface Props {
  onClose: () => void;
}

export const ConfirmDelete = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { boardId, taskId } = useParams();

  const activeBoard = useBoardStore(selectBoard(boardId!));
  const activeTask = useTaskStore(selectTask(taskId!));

  const name = taskId ? activeTask?.taskName : activeBoard?.boardName;

  const handleDelete = () => {
    if (taskId) {
      deleteTask(taskId);
      navigate(`/${boardId}`);
    } else if (boardId) {
      deleteBoard(boardId);
      navigate("/");
    }
    onClose();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="title text-danger-dark">
        {t("ui.delete_title", { name: name })}
      </h2>

      <p className="caption text-text-secondary">
        {t("ui.delete_description", { name: name })}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button className="btn-danger h-10 sm:flex-1" onClick={handleDelete}>
          {t("ui.buttons.delete")}
        </button>
        <button
          className="btn-base note h-10 bg-accent-light font-bold text-accent-dark hover:brightness-105 sm:flex-1"
          onClick={onClose}
        >
          {t("ui.buttons.cancel")}
        </button>
      </div>
    </div>
  );
};
