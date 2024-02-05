import { useUser } from "../contexts/UserContext";
// import ToggleSwitch from "./ToggleSwitch";

function LogoContainer() {
  const { user } = useUser();

  return !(user && user.IsAdmin) ? (
    <div className="logo-container">
      <img
        className="logo"
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/icons/logo.svg`}
        alt="wildtube logo"
      />
    </div>
  ) : (
    <div className="logo-container">
      <img
        className="logo"
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/icons/logo.svg`}
        alt="wildtube logo"
      />
      {/* <ToggleSwitch /> */}
    </div>
  );
}

export default LogoContainer;
