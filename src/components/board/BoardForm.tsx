import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModalParams } from "@/hooks/useModalParams";

import { addBoard, selectBoard, updateBoard } from "@/store/board/selectors";
import { useBoardStore } from "@/store/board/store";

import { Form } from "../Form/Form";
import type { Board } from "@/store/board/types";
import { TextField } from "../Form/TextField";
import { MultiTextField } from "../Form/MultiTextField";

interface BordFormProps {
  title: string;
  submitButtonText: string;
}

export interface FormState {
  boardId: string | null;
  boardName: string | null;
  columns: {
    id: string;
    name: string;
  }[];
}

const initialBoardState = {
  boardId: null,
  boardName: "",
  columns: [{ name: "", id: `column-${Date.now()}` }],
};

export const BoardForm = ({ title, submitButtonText }: BordFormProps) => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { modalType } = useModalParams();

  const activeBoard = useBoardStore(selectBoard(boardId!));

  const defaultValues: FormState = useMemo(() => {
    if (modalType === "edit-board" && activeBoard) {
      return activeBoard;
    }

    return initialBoardState;
  }, [activeBoard, modalType]);

  const submit = (boardData: FormState | Board) => {
    const board =
      modalType === "add-board"
        ? { ...boardData, boardId: `board-${Date.now()}` }
        : (boardData as Board);

    if (modalType === "add-board") addBoard(board as Board);
    if (modalType === "edit-board") updateBoard(board as Board);

    navigate(`/${board.boardId}`);
  };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={submit}
      title={title}
      submitButtonText={submitButtonText}
    >
      <TextField
        label="Name"
        name="boardName"
        placeholder="e.g. Marketing Plan"
      />
      <MultiTextField
        id="column"
        label="Column"
        name="columns"
        placeholder="e.g. Todo"
        buttonText="+ Add New Column"
        isRequired={true}
      />
    </Form>
  );
};
