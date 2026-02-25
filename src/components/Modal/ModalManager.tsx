import { useTranslation } from "react-i18next";

import { useModalParams } from "../../hooks/useModalParams";

import { Modal } from "./Modal";
import { ConfirmDelete } from "../ConfirmDelete/ConfirmDelete";
import { BoardForm } from "../board/BoardForm";
import { TaskForm } from "../task/TaskForm";
import { SubTaskForm } from "../task/SubTaskForm";

export const ModalManager = () => {
  const { t } = useTranslation();

  const { modalType, closeModal } = useModalParams();

  if (!modalType) return null;

  return (
    <Modal>
      {modalType === "add-board" && (
        <BoardForm
          key="add"
          title={t("boards.add_new")}
          submitButtonText={t("boards.create_new")}
        />
      )}
      {modalType === "edit-board" && (
        <BoardForm
          key="edit"
          title={t("boards.edit_board")}
          submitButtonText={t("ui.buttons.save_changes")}
        />
      )}
      {modalType === "delete-board" && <ConfirmDelete onClose={closeModal} />}
      {modalType === "add-task" && (
        <TaskForm
          key="add"
          title={t("tasks.add_new")}
          submitButtonText={t("tasks.create_new")}
        />
      )}
      {modalType === "edit-task" && <SubTaskForm key="edit" />}
      {modalType === "delete-task" && <ConfirmDelete onClose={closeModal} />}
    </Modal>
  );
};
