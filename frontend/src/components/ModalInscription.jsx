import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function ModalInscription({ showModal, setShowModal }) {
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const location = useLocation();

  return location.pathname.includes("/Inscription") ? (
    <div className="modal">
      <div className="modal-content">
        <p>Votre inscription a été effectuée avec succès</p>

        <button onClick={toggleModal} type="button">
          <NavLink to="/Connection">Fermer</NavLink>
        </button>
      </div>
    </div>
  ) : (
    <div className="modal">
      <div className="modal-content">
        <p>Votre compte a été modifié avec succès</p>

        <button onClick={toggleModal} type="button">
          <NavLink to="/UserProfil">Fermer</NavLink>
        </button>
      </div>
    </div>
  );
}

ModalInscription.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ModalInscription;
