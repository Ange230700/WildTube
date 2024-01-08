import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarDesktop from "./components/NavBarDesktop";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {!location.pathname.includes("/moviePlayer/") && <NavBarDesktop />}
      <Outlet />
      {!location.pathname.includes("/moviePlayer/") && <NavBar />}
    </div>
  );
}

export default App;
