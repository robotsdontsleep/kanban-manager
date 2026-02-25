import { IconContext } from "react-icons";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { BoardList } from "./components/board/BoardList";
import { ModalManager } from "./components/Modal/ModalManager";

import { useTheme } from "./hooks/useTheme";

function App() {
  useTheme();

  return (
    <div className="flex h-screen w-full bg-bg-page transition-colors duration-200">
      <IconContext.Provider
        value={{
          className: "shrink-0 transition-colors",
          attr: { "aria-hidden": "true" },
        }}
      >
        <Sidebar>
          <BoardList />
        </Sidebar>
      </IconContext.Provider>

      <main
        role="main"
        className="relative flex flex-1 flex-col min-w-0 overflow-hidden"
      >
        <Outlet />
      </main>

      <ModalManager />
    </div>
  );
}

export default App;
