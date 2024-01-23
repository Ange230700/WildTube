// import ToggleSwitch from "./ToggleSwitch";
import { useUser } from "../contexts/UserContext";

function LogoContainer() {
  const { user } = useUser();

  return !(user && user.IsAdmin) ? (
    <div className="logo-container">
      <img
        className="logo"
        src="/src/assets/icons/logo.svg"
        alt="wildtube logo"
      />
    </div>
  ) : (
    <div className="logo-container">
      <img
        className="logo"
        src="/src/assets/icons/logo.svg"
        alt="wildtube logo"
      />
      {/* <ToggleSwitch /> */}
    </div>
  );
}

export default LogoContainer;
