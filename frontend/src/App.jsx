import { Outlet, useLocation } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { SerieProvider } from "./contexts/SerieContext";
import NavBar from "./components/NavBar";
import NavBarDesktop from "./components/NavBarDesktop";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {!location.pathname.includes("/moviePlayer/") && <NavBarDesktop />}
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
