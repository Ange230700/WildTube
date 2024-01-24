import { useLocation } from "react-router-dom";

function ModalInscription() {
  const location = useLocation();

  if (location.pathname.includes("/Inscription")) {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Votre inscription a été effectuée avec succès</p>
        </div>
      </div>
    );
  }

  if (location.pathname.includes("/account/")) {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Votre compte a été modifié avec succès</p>
        </div>
      </div>
    );
  }

  return null;
}

export default ModalInscription;
