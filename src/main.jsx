import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/landing/Home.jsx";
import About from "./pages/landing/About.jsx";
import Services from "./pages/landing/Services.jsx";
import Terms from "./pages/landing/Terms.jsx";
import Policy from "./pages/landing/Policy.jsx";
import Auth from "./pages/user/auth/Auth.jsx";
import Login from "./pages/user/auth/Login.jsx";
import UserDashboardLayout from "./pages/user/dashboard/DashboardLayout.jsx";
import AdminLogin from "./pages/admin/auth/Login.jsx";
import AdminDashboardLayout from "./pages/admin/dashboard/DashboardLayout.jsx";
import AdminResetPassword from "./pages/admin/auth/ResetPassword.jsx";
import AdminForgotPassword from "./pages/admin/auth/ForgotPassword.jsx";
import ForgotPassword from "./pages/user/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/user/auth/ResetPassword.jsx";

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
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "admin/forgot-password",
        element: <AdminForgotPassword />,
      },
      {
        path: "admin/reset-password",
        element: <AdminResetPassword />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        index: true,
        element: <UserDashboardLayout />,
      },
      {
        path: "vehicles",
        element: <UserDashboardLayout />,
      },
      {
        path: "service-history",
        element: <UserDashboardLayout />,
      },
      {
        path: "settings",
        element: <UserDashboardLayout />,
      },
    ],
  },
  {
    path: "admin/dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardLayout />,
      },
      {
        path: "service-history",
        element: <AdminDashboardLayout />,
      },
    ],
  },
]);

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
