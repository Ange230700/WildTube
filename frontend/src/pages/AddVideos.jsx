import { useState, useEffect } from "react";
import axios from "axios";

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
  const handleAjoutCategorie = (e) => {
    const categoriesFiltered = categories.filter((cat) => {
      // eslint-disable-next-line radix
      if (cat.id === parseInt(e.target.value)) {
        setCategoriesPourAssocier((oldValue) => {
          return [...oldValue, cat];
        });
        return false;
      }
      return cat;
    });
    setCategories(categoriesFiltered);
    // console.log(categories);
    // console.log(categoriesPourAssocier);
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
      // eslint-disable-next-line no-alert
      alert("champ manquant");
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
    formData.append("video", videoUrl);
    formData.append("year", year);
    formData.append("isAvailable", isAvailable);
    formData.append("duration", duration);
    formData.append("images", file);
    formData.append("images", cover);

    // eslint-disable-next-line no-unused-vars
    const result = await axios.post(
      "http://localhost:3310/api/films",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const fetchData = async () => {
    try {
      const resultat = await axios.get("http://localhost:3310/api/categories");
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
    <div className="ProfileDisplaySection">
      <div className="SearchBarContainer">
        <div className="AjouterUneVideo">Ajouter une video</div>
      </div>
      <div className="Emptyfieldscontainer">
        <div className="Imageuploadercontainer">
          <div className="Outlineimageuploader">
            <div className="Frame4">
              <div className="ImporterLeFilm">Importer le film</div>
              <input
                className="input"
                onChange={(e) => setVideoUrl(e.target.value)}
                type="text"
                placeholder="https://www.monfilm.com/"
              />
            </div>
          </div>
          <div className="Outlineimageuploader">
            <div className="Frame4">
              <div className="AjouterUneMiniature">Ajouter une miniature</div>
              <img
                src={previewFile}
                alt="miniature"
                style={{ width: "100px", height: "50px" }}
              />
              <input
                className="input"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </div>
          </div>
          <div className="Outlineimageuploader">
            <div className="Frame4">
              <div className="AjouterUneMiniature">Ajouter une cover</div>
              <img
                src={previewCover}
                alt="cover"
                style={{ width: "100px", height: "50px" }}
              />
              <input
                className="input"
                onChange={(e) => setCover(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="Titleinputcontainer1">
          <div className="Input">
            <div className="TitreDuFilm">Titre du film</div>
            <input
              className="input"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <div className="Titleinputcontainer2">
          <div className="Input">
            <div className="DurEDuFilm">Durée du film</div>
            <input
              className="input"
              onChange={(e) => setDuration(e.target.value)}
              type="text"
            />
          </div>
          <div className="Input">
            <div className="AnnEDeSortie">Année de sortie</div>
            <input
              className="input"
              onChange={(e) => setYear(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <div className="Titleinputcontainer3">
          <div className="Input">
            <div className="CatGorieDuFilm">Catégorie du film</div>
            <select onChange={handleAjoutCategorie}>
              <option value=""> --- </option>
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
        <div className="Titleinputcontainer4">
          <div className="Input">
            <div className="DescriptifDuFilm">Descriptif du film</div>
            <input
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
            checked={isAvailable === "0"}
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
            checked={isAvailable === "1"}
          />
          <div className="UtilisateurAvecCompte">Utilisateur avec compte</div>
        </div>
      </div>
      <div className="Titleinputcontainer">
        <div className="ConnectionButton">
          <button type="submit" className="Ajouter" onClick={submit}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVideos;
