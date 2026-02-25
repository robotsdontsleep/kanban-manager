import { useTranslation } from 'react-i18next';

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Task } from '@/store/task/types';
import { addTask } from '@/store/task/selectors';

import { useBoardStore } from '@/store/board/store';
import { selectBoard } from '@/store/board/selectors';

import { Form } from '../Form/Form';
import { MultiTextField } from '@/components/Form/MultiTextField';
import { TextField } from '@/components/Form/TextField';
import { TextAreaField } from '../Form/TextAreaField';
import { SelectField } from '../Form/SelectField';

interface TaskFormProps {
  title: string;
  submitButtonText: string;
}

export const TaskForm = ({ title, submitButtonText }: TaskFormProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { boardId } = useParams();
  const activeBoard = useBoardStore(selectBoard(boardId!));

  const defaultValues: Task = useMemo(() => {
    return {
      taskId: null,
      taskName: '',
      taskDescription: '',
      subtasks: [{ name: '', isCompleted: false }],
      column: null,
    };
  }, []);

  const submit = (taskData: Task) => {
    const taskId = `task-${Date.now()}`;

    const subtasks = taskData.subtasks
      .filter((sub) => sub.name !== '')
      .map((sub) => ({
        ...sub,
        isCompleted: false,
      }));

    const task = { ...taskData, subtasks, taskId };
    addTask(task);
    void navigate(`/`);
  };

  return (
    <div className="flex w-full flex-col">
      <Form
        defaultValues={defaultValues}
        onSubmit={submit}
        title={title}
        submitButtonText={submitButtonText}
      >
        <div className="flex flex-col gap-6">
          <TextField
            label={t('tasks.task_name')}
            name="taskName"
            placeholder={t('tasks.placeholder_task')}
          />
          <TextAreaField
            label={t('tasks.description')}
            name="taskDescription"
            placeholder={t('tasks.placeholder_desc')}
          />
          <MultiTextField
            id="subtask"
            label={t('tasks.subtasks')}
            name="subtasks"
            placeholder={t('tasks.placeholder_subtask')}
            buttonText={t('ui.buttons.save_changes')}
          />
          <SelectField
            label={t('tasks.column')}
            name="column"
            placeholder={t('tasks.select_column')}
            options={activeBoard?.columns ?? []}
          />
        </div>
      </Form>
    </div>
  );
};
