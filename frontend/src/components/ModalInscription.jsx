import { NavLink } from "react-router-dom";

function ModalInscription() {
  const toggleModal = ({ showModal, setShowModal }) => {
    setShowModal(!showModal);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Votre inscription a été effectuée avec succès</p>

        <button onClick={toggleModal} type="button">
          <NavLink to="/Connection">Fermer</NavLink>
        </button>
      </div>
    </div>
  );
}

export default ModalInscription;
