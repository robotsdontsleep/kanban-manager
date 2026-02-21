import { createBrowserRouter } from "react-router-dom";

import { boardLoader } from "@/store/board/loader";

import App from "@/App";
import { Board } from "@/components/board/Board";
import { Home } from "@/components/Home/Home";
import { BoardError } from "@/components/board/BoardError";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        loader: boardLoader,
      },
      {
        path: ":boardId/:taskId?",
        Component: Board,
        errorElement: <BoardError />,
      },
    ],
  },
]);
