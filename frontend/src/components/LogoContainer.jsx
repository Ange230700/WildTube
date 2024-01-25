import ToggleSwitch from "./ToggleSwitch";
import { useUser } from "../contexts/UserContext";

function LogoContainer() {
  const { user } = useUser();

  return (
    <div className="logo-container">
      <img
        className="logo"
        src="/src/assets/icons/logo.svg"
        alt="wildtube logo"
      />
      {user && user.IsAdmin && (
        <div className="switchContainer">
          <h6>Mode admin :</h6>
          <ToggleSwitch />
        </div>
      )}
    </div>
  );
}

export default LogoContainer;
