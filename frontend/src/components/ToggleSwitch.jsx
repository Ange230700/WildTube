/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";

function ToggleSwitch() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => setIsToggled(!isToggled);

  return (
    <div className="toggle-switch">
      <input
        id="toggle-switch-checkbox"
        type="checkbox"
        checked={isToggled}
        onChange={handleToggle}
      />
      <label htmlFor="toggle-switch-checkbox" className="slider" />
    </div>
  );
}

export default ToggleSwitch;
