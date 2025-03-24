import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";

// § When uploading a video, I would like to see a preview of the video being a snapshot of the video. How can I do that?
// § Regarding the authorization, when the movie is available, the input radio with the guest label should be checked, and when the movie is not available, the input radio with the user label should be checked, and It should be possible to change the authorization by clicking on the input radio, and it should be visible when arriving on the page. After clicking on the edit button, the authorization should be updated in the database if it has been changed. How to do that?

function EditVideo() {
  const { movieId } = useParams();
  const { movies } = useMovies();
  const movie = movies.find((m) => m.id === parseInt(movieId, 10));
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [categorieVideo, setCategorieVideo] = useState([]);
  const navigate = useNavigate();
  const [video, setVideo] = useState({
    title: "",
    videoUrl: "",
    videoFilename: "",
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
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleDeleteCategorie = async (uniqueKey) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/categoriesParFilm/${uniqueKey}`
      );
      if (response.status === 200) {
        toast.success("Success deleting category");
        setCategorieVideo((prevCategorieVideo) =>
          prevCategorieVideo.filter(
            (categorie) => categorie.unique_key !== uniqueKey
          )
        );
      }
    } catch (e) {
      console.error("Error deleting category", e);
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
        // cover_filename: URL.createObjectURL(file),
        images: file,
      }));
    }
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile2(file);
      setVideo((prevVideo) => ({
        ...prevVideo,
        // miniature_filename: URL.createObjectURL(file),
        images: file,
      }));
    }
  };

  const handleFileChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile3(file);
      setVideo((prevVideo) => ({
        ...prevVideo,
        // videoFilename: URL.createObjectURL(file),
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
        toast.success("Success adding category");
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
      if (selectedFile3) formData.append("videoFile", selectedFile3);
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
        toast.success("Video updated successfully");
        if (selectedFile) URL.revokeObjectURL(selectedFile);
        if (selectedFile2) URL.revokeObjectURL(selectedFile2);
        if (selectedFile3) URL.revokeObjectURL(selectedFile3);
        navigate(`/movies/${movieId}`);
      }
    } catch (err) {
      console.error("Error updating the video", err);
      toast.error("Error updating video");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/${movieId}`
      );
      if (response.status === 200) {
        toast.success("Success deleting video");
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

  const imageSrc2 = () => {
    if (selectedFile2) {
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
      if (selectedFile3) {
        URL.revokeObjectURL(selectedFile3);
      }
    };
  }, [selectedFile, selectedFile2]);

  useEffect(() => {
    if (movie) {
      setIsAvailable(movie.IsAvailable === 1);
    }
  }, [movie]);

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
      <div className="containerFormMiniature2">
        <img className="miniature" src={imageSrc2()} alt="Miniature" />
        <input
          type="file"
          className="min"
          onChange={handleFileChange2 || ""}
          accept="image/*"
        />
      </div>
      <div className="containerFormMiniature">
        <img className="miniature" src={imageSrc()} alt="cover" />
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
          placeholder="Title"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            gap: "3rem",
          }}
          className="someContainer"
        >
          <input
            className="edit"
            type="text"
            name="videoUrl"
            value={video?.videoUrl}
            onChange={handleInputChange || ""}
            placeholder="Youtube URL"
          />
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Or
          </p>
          <input
            type="file"
            className="min"
            onChange={handleFileChange3 || ""}
            accept="video/*"
          />
        </div>
        <input
          className="edit"
          type="text"
          name="duration"
          value={video?.duration}
          onChange={handleInputChange || ""}
          placeholder="Duration"
        />
        <input
          className="edit"
          type="text"
          name="year"
          value={video?.year}
          onChange={handleInputChange || ""}
          placeholder="Year"
        />
        <textarea
          className="edit"
          type="text"
          name="description"
          value={video?.description}
          onChange={handleInputChange || ""}
          placeholder="Description"
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
      </div>
      <div className="Grantingscontainer">
        <div className="Autorisation">Authorization</div>
        <div className="Input">
          <label>
            <p>Guest</p>
            <input
              type="radio"
              name="IsAvailable"
              value="1"
              checked={isAvailable}
              onChange={() => setIsAvailable(true)}
            />
          </label>
        </div>
        <div className="Input">
          <label>
            <p>User</p>
            <input
              type="radio"
              name="IsAvailable"
              value="0"
              checked={!isAvailable}
              onChange={() => setIsAvailable(false)}
            />
          </label>
        </div>
      </div>
      <div className="containerButtonEdit">
        <button className="editButton" type="submit">
          Edit
        </button>
        <button className="delete" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </form>
  );
}

export default EditVideo;
