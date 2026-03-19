import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Admin from "./components/admin.jsx";
import ApartmentsPage from "./components/apartmentsPage.jsx";
import UsersPage from "./components/usersPage.jsx";
import ReportsPage from "./components/reportsPage.jsx";
import SocialWorkerAdmin from "./components/socialWorkerAdmin.jsx";
import SocialWorkerReportsPage from "./components/socialWorkerReportsPage.jsx";

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
  {
    path: "/socialWorkerAdmin",
    element: <SocialWorkerAdmin />,
  },
  {
    path: "/socialWorkerReportsPage",
    element: <SocialWorkerReportsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
