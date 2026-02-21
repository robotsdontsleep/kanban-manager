import { useModalParams } from "../../hooks/useModalParams";

import { Modal } from "./Modal";
import { ConfirmDelete } from "../ConfirmDelete/ConfirmDelete";
import { BoardForm } from "../board/BoardForm";
import { TaskForm } from "../task/TaskForm";
import { SubTaskForm } from "../task/SubTaskForm";

export const ModalManager = () => {
  const { modalType, closeModal } = useModalParams();

  if (!modalType) return;

  return (
    <Modal>
      {modalType === "add-board" && (
        <BoardForm
          key="add"
          title="Add New Board"
          submitButtonText="Create New Board"
        />
      )}
      {modalType === "edit-board" && (
        <BoardForm
          key="edit"
          title="Edit Board"
          submitButtonText="Save Changes"
        />
      )}
      {modalType === "delete-board" && <ConfirmDelete onClose={closeModal} />}
      {modalType === "add-task" && (
        <TaskForm
          key="add"
          title="Add New Task"
          submitButtonText="Create Task"
        />
      )}
      {modalType === "edit-task" && <SubTaskForm key="edit" />}
      {modalType === "delete-task" && <ConfirmDelete onClose={closeModal} />}
    </Modal>
  );
};
