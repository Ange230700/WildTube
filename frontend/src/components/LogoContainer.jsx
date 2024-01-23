import useAuth from "../hooks/useAuth";
// import ToggleSwitch from "./ToggleSwitch";

function LogoContainer() {
  const { user } = useAuth();

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
