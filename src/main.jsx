import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Admin from "./components/admin.jsx";
import ApartmentsPage from "./components/apartmentsPage.jsx";
import UsersPage from "./components/usersPage.jsx";
import ReportsPage from "./components/reportsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "*",
    element: <Admin />,
  },
  {
    path: "/apartmentsPage",
    element: <ApartmentsPage />,
  },
  {
    path: "/usersPage",
    element: <UsersPage />,
  },
  {
    path: "/reportsPage",
    element: <ReportsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
