import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function EditVideo() {
  const { movieId } = useParams();
  const [video, setVideo] = useState({
    miniature: "",
    title: "",
    cover: "",
    videoUrl: "",
    duration: "",
    year: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleEditClick = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/${movieId}`,
        video
      );
      if (response.status === 204) {
        toast.success("Video modifié");
      } else {
        toast.error("Aie un soucis est apparue");
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
      }
    } catch (e) {
      console.error("Error deleting", e);
    }
  };

  return (
    <div className="ContainerEditVideo">
      <div className="containerImage" />
      <div className="titlePage">
        <h3 className="Edit">Edit video</h3>
      </div>
      <form className="containerFormMiniature">
        <img
          className="miniature"
          src={
            selectedFile ? URL.createObjectURL(selectedFile) : video.miniature
          }
          alt="Miniature"
        />
        <input type="file" className="min" onChange={handleFileChange} />
      </form>
      <form className="containerFormEdit">
        <input
          className="edit"
          name="title"
          type="text"
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
        <input
          className="edit"
          type="text"
          name="description"
          value={video.description}
          onChange={handleInputChange}
        />
      </form>
      <div className="containerButtonEdit">
        <button className="editButton" type="button" onClick={handleEditClick}>
          Éditer
        </button>
        <button className="delete" type="button" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default EditVideo;
