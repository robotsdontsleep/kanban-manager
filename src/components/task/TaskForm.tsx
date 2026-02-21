import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Task } from "@/store/task/types";
import { addTask } from "@/store/task/selectors";

import { useBoardStore } from "@/store/board/store";
import { selectBoard } from "@/store/board/selectors";

import { Form } from "../Form/Form";
import { MultiTextField } from "@/components/Form/MultiTextField";
import { TextField } from "@/components/Form/TextField";
import { TextAreaField } from "../Form/TextAreaField";
import { SelectField } from "../Form/SelectField";

interface TaskFormProps {
  title: string;
  submitButtonText: string;
}

export const TaskForm = ({ title, submitButtonText }: TaskFormProps) => {
  const navigate = useNavigate();

  const { boardId } = useParams();
  const activeBoard = useBoardStore(selectBoard(boardId!));

  const defaultValues: Task = useMemo(() => {
    return {
      taskId: null,
      taskName: "",
      taskDescription: "",
      subtasks: [{ name: "", isCompleted: false }],
      column: null,
    };
  }, []);

  const submit = (taskData: Task) => {
    const taskId = `task-${Date.now()}`;

    const subtasks = taskData.subtasks
      .filter((sub) => sub.name !== "")
      .map((sub) => ({
        ...sub,
        isCompleted: false,
      }));

    const task = { ...taskData, subtasks, taskId };
    addTask(task);
    navigate(`/`);
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
        name="taskName"
        placeholder="e.g. Take coffee break"
      />
      <TextAreaField
        label="Description"
        name="taskDescription"
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
      />
      <MultiTextField
        id="subtask"
        label="Sub Tasks"
        name="subtasks"
        placeholder="e.g. Make coffee"
        buttonText="+ Add New Subtask"
      />
      <SelectField
        label="Column"
        name="column"
        placeholder="select column"
        options={activeBoard?.columns || []}
      />
    </Form>
  );
};
