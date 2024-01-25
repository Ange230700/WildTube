import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { UserProvider } from "./contexts/UserContext";
import { AdminModeProvider } from "./contexts/AdminModeContext";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Categories from "./pages/Categories";
import Movie from "./pages/Movie";
import MoviePlayer from "./pages/MoviePlayer";
import Inscription from "./pages/Inscription";
import Connection from "./pages/Connection";
import ParametreAdmin from "./pages/ParametreAdmin";
import UserProfil from "./pages/UserProfil";
import UserProfileEditor from "./pages/UserProfileEditor";
import AjoutAdmin from "./pages/AjoutAdmin";
import EditVideo from "./pages/EditVideo";
import AddSection from "./pages/AddSection";
import EditSection from "./pages/EditSection";
import ProtectedRoute from "./components/ProtectedRoute";
import "./sass/index.scss";

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
        path: "search/",
        element: <Search />,
      },
      {
        path: "favorites/",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "watchlist/",
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:catId",
        element: <Categories />,
      },
      {
        path: "/movies/:movieId",
        element: <Movie />,
      },
      {
        path: "/moviePlayer/:movieId",
        element: <MoviePlayer />,
      },
      {
        path: "/connection",
        element: <Connection />,
      },
      {
        path: "/Inscription",
        element: <Inscription />,
      },
      {
        path: "/Parametre",
        element: (
          <ProtectedRoute>
            <ParametreAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profil",
        element: (
          <ProtectedRoute>
            <UserProfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account/:userId",
        element: (
          <ProtectedRoute>
            <UserProfileEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: "/AjoutAdmin",
        element: (
          <ProtectedRoute>
            <AjoutAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/EditVideo/:movieId",
        element: (
          <ProtectedRoute>
            <EditVideo />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addSection",
        element: (
          <ProtectedRoute>
            <AddSection />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editSection/:sectionId",
        element: (
          <ProtectedRoute>
            <EditSection />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AdminModeProvider>
      <UserProvider>
        <MovieProvider>
          <RouterProvider router={router} />
        </MovieProvider>
      </UserProvider>
    </AdminModeProvider>
  </React.StrictMode>
);
