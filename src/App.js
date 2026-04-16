import React, { useState } from "react";
import * as Icon from "react-feather";
import "./App.scss";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import About from "./pages/About";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminResume from "./pages/admin/AdminResume";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSystemSettings from "./pages/admin/AdminSystemSettings";
import { isAdminAuthenticated } from "./pages/admin/adminAuth";
import BlogDetails from "./pages/BlogDetails";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Portfolios from "./pages/Portfolios";
import Resumes from "./pages/Resumes";

function AdminIndexRoute() {
  return isAdminAuthenticated() ? (
    <Navigate replace to="/admin/dashboard" />
  ) : (
    <AdminLogin />
  );
}

function AdminProtectedRoute() {
  return isAdminAuthenticated() ? (
    <AdminLayout />
  ) : (
    <Navigate replace to="/admin-login" />
  );
}

function PublicRouteFrame({ lightMode, onToggleMode }) {
  return (
    <>
      <div className="light-mode">
        <span className="icon">
          <Icon.Sun />
        </span>
        <button
          className={
            lightMode ? "light-mode-switch active" : "light-mode-switch"
          }
          onClick={onToggleMode}
        ></button>
      </div>
      <Outlet />
    </>
  );
}

function App() {
  const [lightMode, setLightMode] = useState(false); // Made it true if you want to load your site light mode primary

  lightMode
    ? document.body.classList.add("light")
    : document.body.classList.remove("light");

  const handleMode = () => {
    if (!lightMode) {
      setLightMode(true);
      document.body.classList.add("light");
    } else {
      setLightMode(false);
      document.body.classList.remove("light");
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRouteFrame
          lightMode={lightMode}
          onToggleMode={() => handleMode()}
        />
      ),
      children: [
        {
          index: true,
          element: <Home lightMode={lightMode} />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "resume",
          element: <Resumes />,
        },
        {
          path: "portfolios",
          element: <Portfolios lightMode={lightMode} />,
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "blogs/:id/:title",
          element: <BlogDetails />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/admin-login",
      element: <AdminIndexRoute />,
    },
    {
      path: "/admin",
      element: <AdminProtectedRoute />,
      children: [
        {
          index: true,
          element: <Navigate replace to="/admin/dashboard" />,
        },
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "home",
          element: <AdminHome />,
        },
        {
          path: "about",
          element: <AdminAbout />,
        },
        {
          path: "resume",
          element: <AdminResume />,
        },
        {
          path: "projects",
          element: <AdminProjects />,
        },
        {
          path: "blogs",
          element: <AdminBlogs />,
        },
        {
          path: "messages",
          element: <AdminMessages />,
        },
        {
          path: "settings",
          element: <AdminSettings />,
        },
        {
          path: "system-settings",
          element: <AdminSystemSettings />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
