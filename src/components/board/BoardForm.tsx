import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useModalParams } from '@/hooks/useModalParams';
import { addBoard, selectBoard, updateBoard } from '@/store/board/selectors';
import { useBoardStore } from '@/store/board/store';
import type { Board } from '@/store/board/types';

import { Form } from '../Form/Form';
import { TextField } from '../Form/TextField';
import { MultiTextField } from '../Form/MultiTextField';

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
  boardName: '',
  columns: [{ name: '', id: `column-${Date.now()}` }],
};

export const BoardForm = ({ title, submitButtonText }: BordFormProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { boardId } = useParams();
  const { modalType } = useModalParams();

  const activeBoard = useBoardStore(selectBoard(boardId!));

  const defaultValues: FormState = useMemo(() => {
    if (modalType === 'edit-board' && activeBoard) {
      return activeBoard;
    }

    return initialBoardState;
  }, [activeBoard, modalType]);

  const submit = async (boardData: FormState | Board) => {
    const board =
      modalType === 'add-board'
        ? { ...boardData, boardId: `board-${Date.now()}` }
        : (boardData as Board);

    if (modalType === 'add-board') addBoard(board as Board);
    if (modalType === 'edit-board') updateBoard(board as Board);
    await navigate(`/${board.boardId}`);
  };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={submit}
      title={title}
      submitButtonText={submitButtonText}
    >
      <div className="flex flex-col gap-6">
        <TextField
          label={t('boards.board_name')}
          name="boardName"
          placeholder={t('boards.placeholder_name')}
        />
        <MultiTextField
          id="column"
          label={t('boards.board_columns')}
          name="columns"
          placeholder={t('boards.placeholder_column')}
          buttonText={t('boards.new_column')}
          isRequired={true}
        />
      </div>
    </Form>
  );
};
