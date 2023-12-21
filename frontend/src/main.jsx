import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import MoviePlayer from "./pages/MoviePlayer";
import Inscription from "./pages/Inscription";
import Connection from "./pages/Connection";
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
        path: "search",
        element: <Search />,
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <MovieProvider>
        <App />
      </MovieProvider>
    </RouterProvider>
  </React.StrictMode>
);
