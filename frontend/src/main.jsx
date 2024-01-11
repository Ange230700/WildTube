/*eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { UserProvider } from "./contexts/UserContext";
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
import "./sass/index.scss";
import AjoutAdmin from "./pages/AjoutAdmin";

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
        element: <Favorites />,
      },
      {
        path: "watchlist/",
        element: <Watchlist />,
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
        element: <ParametreAdmin />,
      },
      {
        path: "/profil",
        element: <UserProfil />,
      },
      {
        path: "/AjoutAdmin",
        element: <AjoutAdmin />,
      },

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <MovieProvider>
        <RouterProvider router={router} />
      </MovieProvider>
    </UserProvider>
  </React.StrictMode>
);
