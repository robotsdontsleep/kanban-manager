import { Outlet } from "react-router-dom";

import { useTheme } from "./hooks/useTheme";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { BoardList } from "./components/board/BoardList";
import { ModalManager } from "./components/Modal/ModalManager";

import { IconContext } from "react-icons";

function App() {
  useTheme();

  return (
    <div className="flex h-screen w-full">
      <IconContext.Provider value={{ className: "icon" }}>
        <Sidebar>
          <BoardList />
        </Sidebar>
      </IconContext.Provider>
      <Outlet />
      <ModalManager />
    </div>
  );
}

export default App;
