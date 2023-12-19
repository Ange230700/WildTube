import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import NavBarDesktop from "./components/NavBarDesktop";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <NavBarDesktop />
      <MovieProvider>
        <Outlet />
      </MovieProvider>
      {!location.pathname.includes("/moviePlayer/") && <NavBar />}
    </div>
  );
}

export default App;
