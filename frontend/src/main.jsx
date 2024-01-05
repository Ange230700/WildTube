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
import Categories from "./pages/Categories";
import Movie from "./pages/Movie";
import Serie from "./pages/Serie";
import MoviePlayer from "./pages/MoviePlayer";
import Inscription from "./pages/Inscription";
import Connection from "./pages/Connection";
import ParametreAdmin from "./pages/ParametreAdmin";
import PlusTard from "./pages/PlusTard";
import "./sass/index.scss";
import { SerieProvider } from "./contexts/SerieContext";
import UserProfil from "./pages/UserProfil";

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
        path: "category/:catId",
        element: <Categories />,
      },
      // {
      //   path: "profile",
      //   element: <h1>Profile</h1>,
      // },
      {
        path: "/movies/:movieId",
        element: <Movie />,
      },
      {
        path: "/series/:serieId",
        element: <Serie />,
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
        path: "/AregarderPlusTard",
        element: <PlusTard />,
      },
      {
        path: "/profil",
        element: <UserProfil />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <SerieProvider>
        <MovieProvider>
          <RouterProvider router={router} />
        </MovieProvider>
      </SerieProvider>
    </UserProvider>
  </React.StrictMode>
);
