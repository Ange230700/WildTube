import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMovies } from "../contexts/MovieContext";

function AddVideos() {
  const [file, setFile] = useState(undefined);
  const [previewFile, setPreviewFile] = useState();
  const [previewCover, setPreviewCover] = useState();
  const [cover, setCover] = useState(undefined);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesPourAssocier, setCategoriesPourAssocier] = useState([]);
  const navigate = useNavigate();

  const { fetchMovies } = useMovies();

  const handleAjoutCategorie = (e) => {
    const categoriesFiltered = categories.filter((cat) => {
      if (cat.id === parseInt(e.target.value, 10)) {
        setCategoriesPourAssocier((oldValue) => {
          return [...oldValue, cat];
        });
        return false;
      }
      return cat;
    });
    setCategories(categoriesFiltered);
  };

  const handleSuppCategorie = (clickedCategoryId) => {
    // Retrouver la catégorie cliquée dans categoriesPourAssocier
    const clickedCategory = categoriesPourAssocier.find(
      (cat) => cat.id === clickedCategoryId
    );

    if (clickedCategory) {
      // Ajouter la catégorie à categories
      setCategories((prevCategories) => [...prevCategories, clickedCategory]);

      // Filtrer categoriesPourAssocier pour exclure la catégorie cliquée
      const updatedCategoriesPourAssocier = categoriesPourAssocier.filter(
        (cat) => cat.id !== clickedCategoryId
      );
      setCategoriesPourAssocier(updatedCategoriesPourAssocier);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (
      (file ||
        cover ||
        description ||
        title ||
        videoUrl ||
        year ||
        duration ||
        isAvailable) === (undefined || "" || false)
    ) {
      toast.error("champ manquant");
    } else if (isAvailable === "utilisateur") {
      setIsAvailable(true);
    } else if (isAvailable === "visiteur") {
      setIsAvailable(false);
    } else if (isAvailable === "administrateur") {
      setIsAvailable(true);
    }
    const formData = new FormData();

    formData.append("category", JSON.stringify(categoriesPourAssocier));
    formData.append("description", description);
    formData.append("title", title);
    formData.append("videoUrl", videoUrl);
    formData.append("year", year);
    formData.append("isAvailable", isAvailable);
    formData.append("duration", duration);
    formData.append("images", file);
    formData.append("images", cover);

    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/films`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Film ajouté avec succès");
        setTimeout(() => {
          fetchMovies();
        }, 1);
        navigate("/");
      })
      .catch(() => {
        toast.error("Erreur lors de l'ajout du film");
        setTimeout(() => {
          fetchMovies();
        }, 1);
      });
  };

  const fetchData = async () => {
    try {
      const resultat = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      );
      setCategories(resultat.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (file) {
      const objectUrlFile = URL.createObjectURL(file);
      setPreviewFile(objectUrlFile);
    }
    if (cover) {
      const objectUrlCover = URL.createObjectURL(cover);
      setPreviewCover(objectUrlCover);
    }
  }, [file, cover]);

  return (
    <form className="ProfileDisplaySection2" onSubmit={submit}>
      <div className="SearchBarContainer">
        <h2 className="AjouterUneVideo">Ajouter une video</h2>
      </div>
      <div className="Emptyfieldscontainer">
        <div className="Imageuploadercontainer">
          <div className="inputContainer">
            <input
              type="text"
              name="name"
              className="input"
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="lien de la video"
            />
          </div>
          <div className="Outlineimageuploader">
            <div className="Frame4">
              <h4 className="AjouterUneMiniature">Ajouter une miniature</h4>
              <div className="imageContainer">
                {previewFile && <img src={previewFile} alt="miniature" />}
              </div>
            </div>
            <input
              className="input"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            />
          </div>
          <div className="Outlineimageuploader">
            <div className="Frame4">
              <h4 className="AjouterUneMiniature">Ajouter une cover</h4>
              <div className="imageContainer2">
                {previewCover && <img src={previewCover} alt="cover" />}
              </div>
            </div>
            <input
              className="input"
              onChange={(e) => setCover(e.target.files[0])}
              type="file"
              accept="image/*"
            />
          </div>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            name="name"
            className="input"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du film"
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            name="name"
            className="input"
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Durée du film"
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            name="name"
            className="input"
            onChange={(e) => setYear(e.target.value)}
            placeholder="Année de sortie"
          />
        </div>
        <h4>Catégorie du film</h4>
        <select onChange={handleAjoutCategorie}>
          <option value=""> --- </option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="Titleinputcontainer3">
          <div className="Input">
            <div className="tab">
              {categoriesPourAssocier.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleSuppCategorie(cat.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSuppCategorie(cat.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="DescriptifDuFilm">Descriptif du film</div>
        <div className="Titleinputcontainer4">
          <div className="Input">
            <textarea
              className="input"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="Grantingscontainer">
        <div className="Autorisation">Autorisation</div>
        <div className="Input">
          <input
            name="visiteur"
            type="radio"
            value="0"
            className="radioButton"
            onClick={(e) => setIsAvailable(e.target.value)}
            checked={isAvailable === "0" || ""}
            onChange={(e) => setIsAvailable(e.target.value)}
          />
          <div className="Visiteur">Visiteur</div>
        </div>
        <div className="Input">
          <input
            name="utilisateur"
            type="radio"
            value="1"
            className="radioButton"
            onClick={(e) => setIsAvailable(e.target.value)}
            checked={isAvailable === "1" || ""}
            onChange={(e) => setIsAvailable(e.target.value)}
          />
          <div className="Visiteur">Utilisateur</div>
        </div>
      </div>
      <div className="Titleinputcontainer">
        <div className="ConnectionButton">
          <button type="submit" className="Ajouter">
            Ajouter
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddVideos;
