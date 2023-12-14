import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <div className="app">
      <MovieProvider>
        <Outlet />
      </MovieProvider>
      <NavBar />
    </div>
  );
}

export default App;
