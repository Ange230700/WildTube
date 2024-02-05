import { useAdminMode } from "../contexts/AdminModeContext";

function ToggleSwitch() {
  const { isAdminMode, setIsAdminMode } = useAdminMode();

  const handleToggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <div className="toggle-switch">
      <input
        id="toggle-switch-checkbox"
        type="checkbox"
        checked={isAdminMode}
        onChange={handleToggleAdminMode}
      />
      <label htmlFor="toggle-switch-checkbox" className="slider" />
    </div>
  );
}

export default ToggleSwitch;
