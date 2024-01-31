import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function EditVideo() {
  const { movieId } = useParams();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [categorieVideo, setCategorieVideo] = useState([]);
  const navigate = useNavigate();
  const [video, setVideo] = useState({
    miniature_url: "",
    title: "",
    videoUrl: "",
    duration: "",
    year: "",
    miniature_filename: "",
    description: "",
    categorie: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDeleteCategorie = async (uniqueKey) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/categoriesParFilm/${uniqueKey}`
      );
      if (response.status === 200) {
        toast.success("Success");
        setCategorieVideo((prevCategorieVideo) =>
          prevCategorieVideo.filter(
            (categorie) => categorie.unique_key !== uniqueKey
          )
        );
      }
    } catch (e) {
      console.error("Error deleting", e);
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/films/${movieId}`
        );
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video details", error);
      }
    };

    fetchVideo();
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setVideo((prevVideo) => ({
        ...prevVideo,
        miniature: URL.createObjectURL(file),
      }));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategorieVideo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/film/${movieId}`
      );
      setCategorieVideo(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategorieVideo();
  }, []);

  const handleAddCategorie = async (value) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/categoriesParFilm`,
        {
          categorieId: value,
          filmId: movieId,
        }
      );
      if (response.status === 201) {
        toast.success("Success");
        fetchCategorieVideo();
      }
    } catch (e) {
      console.error("Error adding", e);
    }
  };

  const handleEditClick = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/${movieId}`,
        video
      );
      if (response.status === 204) {
        toast.success("Edited video");
        navigate("/");
      } else {
        toast.error("A problem appeared");
      }
    } catch (e) {
      console.error("Error for editing");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/${movieId}`
      );
      if (response.status === 200) {
        toast.success("Success");
        navigate("/");
      }
    } catch (e) {
      console.error("Error deleting", e);
    }
  };

  const imageSrc = () => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    if (video.miniature_filename) {
      return (
        video.miniature_filename &&
        `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
          video.miniature_filename
        }`
      );
    }
    return video.miniature_url;
  };

  console.warn(imageSrc());

  return (
    <div
      className="ContainerEditVideo"
      style={
        location.pathname.includes("/EditVideo/")
          ? {
              marginBottom: "19.6875vw",
            }
          : {}
      }
    >
      <div className="titlePage">
        <h3 className="Edit">Edit video</h3>
      </div>
      <form className="containerFormMiniature">
        <img className="miniature" src={imageSrc()} alt="Miniature" />
        <input type="file" className="min" onChange={handleFileChange} />
      </form>
      <form className="containerFormEdit">
        {/* <label htmlFor="title">titre</label> */}
        <input
          className="edit"
          name="title"
          type="text"
          // id="title"
          value={video.title}
          onChange={handleInputChange}
        />
        <input
          className="edit"
          type="text"
          name="cover"
          value={video.cover}
          onChange={handleInputChange}
        />
        <input
          className="edit"
          type="text"
          name="videoUrl"
          value={video.videoUrl}
          onChange={handleInputChange}
        />
        <input
          className="edit"
          type="text"
          name="duration"
          value={video.duration}
          onChange={handleInputChange}
        />
        <input
          className="edit"
          type="text"
          name="year"
          value={video.year}
          onChange={handleInputChange}
        />
        <textarea
          className="edit"
          type="text"
          name="description"
          value={video.description}
          onChange={handleInputChange}
        />
        <div className="categories">
          {categorieVideo.map((categorie) => (
            <div className="containerCategorie" key={categorie.unique_key}>
              {categorie.name}

              <button
                className="buttonDelete"
                type="button"
                onClick={() => handleDeleteCategorie(categorie.unique_key)}
              >
                <img
                  className="imgCroix"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/icons/xmark-solid.svg`}
                  alt="Red Cross"
                />
              </button>
            </div>
          ))}
        </div>
        <select
          onChange={(e) => handleAddCategorie(e.target.value)}
          className="edit"
          name="category"
          value={video.categorie}
        >
          <option value="">Choose a category</option>
          {categories
            .filter(
              (category) =>
                !categorieVideo.find(
                  (categorie) => categorie.id === category.id
                )
            )
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <div className="containerButtonEdit">
          <button
            className="editButton"
            type="button"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button className="delete" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVideo;
