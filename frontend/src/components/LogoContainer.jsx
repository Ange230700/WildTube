import { useLocation } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";
import { useUser } from "../contexts/UserContext";

function LogoContainer() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <div className="logo-container">
      <img
        className="logo"
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/icons/logo.svg`}
        alt="wildtube logo"
      />
      {user && user.IsAdmin ? (
        <div className="switchContainer">
          {!location.pathname.includes("/AjoutAdmin") &&
            !location.pathname.includes("/connection") &&
            !location.pathname.includes("/account/") && (
              <>
                <h6>Mode admin :</h6>
                <ToggleSwitch user={user} />
              </>
            )}
        </div>
      ) : null}
    </div>
  );
}

export default LogoContainer;
