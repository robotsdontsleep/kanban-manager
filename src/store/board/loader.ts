import { redirect } from "react-router-dom";

export const boardLoader = () => {
  const activeBoard = localStorage.getItem("activeBoard");

  if (activeBoard) {
    return redirect(`/${activeBoard}`);
  }
  return null;
};
