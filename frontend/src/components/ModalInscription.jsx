import { useLocation } from "react-router-dom";

function ModalInscription() {
  const location = useLocation();

  if (location.pathname.includes("/Inscription")) {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Your registration has been done successfully</p>
        </div>
      </div>
    );
  }

  if (location.pathname.includes("/account/")) {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Your account has been successfully modified</p>
        </div>
      </div>
    );
  }

  return null;
}

export default ModalInscription;
