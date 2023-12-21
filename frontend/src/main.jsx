import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import Movie from "./pages/Movie";
import Serie from "./pages/Serie";
import MoviePlayer from "./pages/MoviePlayer";
import "./sass/index.scss";
import { SerieProvider } from "./contexts/SerieContext";

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <SerieProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </SerieProvider>
    </RouterProvider>
  </React.StrictMode>
);
