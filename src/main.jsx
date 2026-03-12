import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Terms from "./pages/legal/Terms.jsx";
import Policy from "./pages/legal/Policy.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Login from "./pages/auth/Login.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "policy",
        element: <Policy />,
      },
      {
        path: "sign-up",
        element: <Auth />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
      {
        path: "vehicles",
        element: <DashboardLayout />,
      },
      {
        path: "service-history",
        element: <DashboardLayout />,
      },
      {
        path: "settings",
        element: <DashboardLayout />,
      },
    ],
  },
]);

import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
