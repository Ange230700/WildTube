import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
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
