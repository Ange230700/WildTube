import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";

// § On this page, the user can edit a video. The user should be able to upload a new cover and a new miniature. I fail to handle the image upload. I tried to use the URL.createObjectURL(file) method to display the image before uploading it to the server.

function EditVideo() {
  const { movieId } = useParams();
  const { movies } = useMovies();
  const movie = movies.find((m) => m.id === parseInt(movieId, 10));
  console.warn("movie", movie && movie);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [categorieVideo, setCategorieVideo] = useState([]);
  const navigate = useNavigate();
  const [video, setVideo] = useState({
    title: "",
    videoUrl: "",
    duration: "",
    year: "",
    description: "",
    categorie: "",
    cover: "",
    miniature: "",
    IsAvailable: movie?.IsAvailable,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

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
    console.warn("file in handleFileChange function => ", file);
    if (file) {
      setSelectedFile(file);
      console.warn(
        "URL.createObjectURL(file) in handleFileChange function => ",
        URL.createObjectURL(file)
      );
      setVideo((prevVideo) => ({
        ...prevVideo,
        // cover_filename: URL.createObjectURL(file),
        images: file,
      }));
    }
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    console.warn("file2 in handleFileChange2 function => ", file);
    if (file) {
      setSelectedFile2(file);
      console.warn(
        "URL.createObjectURL(file2) in handleFileChange2 function => ",
        URL.createObjectURL(file)
      );
      setVideo((prevVideo) => ({
        ...prevVideo,
        // miniature_filename: URL.createObjectURL(file),
        images: file,
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
      const formData = new FormData();
      formData.append("title", video.title);
      formData.append("videoUrl", video.videoUrl);
      formData.append("duration", video.duration);
      formData.append("year", video.year);
      formData.append("description", video.description);
      if (selectedFile) formData.append("cover", selectedFile);
      if (selectedFile2) formData.append("miniature", selectedFile2);
      formData.append("IsAvailable", movie?.IsAvailable);
      formData.append("categorie", video.categorie);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/${movieId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 204) {
        toast.success("Success");
        if (selectedFile) URL.revokeObjectURL(selectedFile);
        if (selectedFile2) URL.revokeObjectURL(selectedFile2);
        navigate(`/movies/${movieId}`);
      }
    } catch (err) {
      console.error("Error editing", err);
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

  console.warn("selectedFile before imageSrc", selectedFile2);
  console.warn("video.cover_filename before imageSrc", video.cover_filename);
  const imageSrc = () => {
    if (selectedFile) {
      console.warn("selectedFile in imageSrc", selectedFile);
      console.warn(
        "URL.createObjectURL(selectedFile) in imageSrc",
        URL.createObjectURL(selectedFile)
      );
      return URL.createObjectURL(selectedFile);
    }
    if (video.cover_filename) {
      return (
        video.cover_filename &&
        `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
          video?.cover_filename
        }`
      );
    }
    return video.cover_url;
  };

  console.warn("selectedFile2 before imageSrc2", selectedFile2);
  console.warn(
    "video.miniature_filename before imageSrc2",
    video.miniature_filename
  );
  const imageSrc2 = () => {
    if (selectedFile2) {
      console.warn("selectedFile2 in imageSrc2", selectedFile2);
      console.warn(
        "URL.createObjectURL(selectedFile2) in imageSrc2",
        URL.createObjectURL(selectedFile2)
      );
      return URL.createObjectURL(selectedFile2);
    }
    if (video.miniature_filename) {
      return (
        video.miniature_filename &&
        `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
          video?.miniature_filename
        }`
      );
    }
    return video?.miniature_url;
  };

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile);
      }
      if (selectedFile2) {
        URL.revokeObjectURL(selectedFile2);
      }
    };
  }, [selectedFile, selectedFile2]);

  return (
    <form
      className="ContainerEditVideo"
      style={
        location.pathname.includes("/EditVideo/")
          ? {
              marginBottom: "19.6875vw",
            }
          : {}
      }
      onSubmit={(e) => {
        e.preventDefault();
        handleEditClick();
      }}
    >
      <div className="titlePage">
        <h3 className="Edit">Edit video</h3>
      </div>
      <div className="containerFormMiniature">
        <img className="miniature" src={imageSrc2()} alt="Miniature" />
        <input
          type="file"
          className="min"
          onChange={handleFileChange2 || ""}
          accept="image/*"
        />
      </div>
      <div className="containerFormMiniature">
        <img className="miniature" src={imageSrc()} alt="Miniature" />
        <input
          type="file"
          className="min"
          onChange={handleFileChange || ""}
          accept="image/*"
        />
      </div>
      <div className="containerFormEdit">
        <input
          className="edit"
          name="title"
          type="text"
          value={video?.title}
          onChange={handleInputChange || ""}
        />
        <input
          className="edit"
          type="text"
          name="cover"
          value={video?.cover}
          onChange={handleInputChange || ""}
        />
        <input
          className="edit"
          type="text"
          name="videoUrl"
          value={video?.videoUrl}
          onChange={handleInputChange || ""}
        />
        <input
          className="edit"
          type="text"
          name="duration"
          value={video?.duration}
          onChange={handleInputChange || ""}
        />
        <input
          className="edit"
          type="text"
          name="year"
          value={video?.year}
          onChange={handleInputChange || ""}
        />
        <textarea
          className="edit"
          type="text"
          name="description"
          value={video?.description}
          onChange={handleInputChange || ""}
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
          value={video?.categorie}
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
          <button className="editButton" type="submit">
            Edit
          </button>
          <button className="delete" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditVideo;
