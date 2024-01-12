import LogoContainer from "../components/LogoContainer";

function EditVideo() {
  return (
    <div className="ContainerEditVideo">
      <div className="containerImage">
        <LogoContainer />
      </div>
      <div className="titlePage">
        <h3 className="Edit">Edit video</h3>
      </div>
      <form className="containerFormMiniature">
        <input className="miniature" type="text" />
      </form>
      <form className="containerFormEdit">
        <input className="edit" type="text" />
        <input className="edit" type="text" />
        <input className="edit" type="text" />
        <input className="edit" type="text" />
        <input className="edit" type="text" />
        <input className="edit" type="text" />
        <input className="edit" type="text" />
        <input className="edit" type="text" />
        <input className="edit" type="text" />
      </form>
      <div className="containerButtonEdit">
        <button className="edit" type="button">
          Editer
        </button>
        <button className="delete" type="button">
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default EditVideo;
