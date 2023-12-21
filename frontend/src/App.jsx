import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import { SerieProvider } from "./contexts/SerieContext";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <SerieProvider>
        <MovieProvider>
          <Outlet />
        </MovieProvider>
      </SerieProvider>
      {!location.pathname.includes("/moviePlayer/") && <NavBar />}
    </div>
  );
}

export default App;
