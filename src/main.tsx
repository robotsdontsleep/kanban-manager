// import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

import "./main.css";
import "../i18n";

const root = document.getElementById("root");

createRoot(root!).render(
  // <StrictMode>
  <RouterProvider router={router} />,
  // </StrictMode>,
);
