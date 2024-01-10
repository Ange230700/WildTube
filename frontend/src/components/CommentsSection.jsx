import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function CommentsSection({ filmId, user }) {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const addComment = async (content) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/comments/`;
    const commentData = {
      userId: user.id,
      filmId,
      content,
    };

    try {
      await axios.post(url, commentData);

      // fetch comments again or update state to show the new comment
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/film/${filmId}`
      );

      setComments(response.data);
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const handleCommentSubmit = () => {
    if (commentContent.trim()) {
      addComment(commentContent);
      setCommentContent(""); // Reset textarea after submit
    }
  };

  const handleTextareaChange = (e) => {
    setCommentContent(e.target.value); // Update state on textarea change
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/comments/film/${filmId}`;
        const response = await axios.get(url);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [filmId]);

  return (
    <section className="CommentsSection">
      <div className="CommentsSectionTitle">
        <h3 className="Commentaires">Commentaires</h3>
      </div>
      <div className="CommentsWrapper">
        {comments.length === 0 ? (
          <h4>Soyez le premier à commenter ce film !</h4>
        ) : (
          comments.map((comment) => {
            const formattedDate = comment.date.slice(0, 19).replace("T", " ");

            return (
              <div className="CommentContainer" key={comment.unique_key}>
                {" "}
                <div className="UserInfo">
                  <img
                    alt={comment.username}
                    className="Avatar2"
                    src="https://avatars.githubusercontent.com/u/97165289"
                  />
                  <h6 className="Username">{comment.name}</h6>
                </div>
                <div className="FrameContainer">
                  <div className="Frame1">
                    <p className="CommentText">{comment.content}</p>
                  </div>
                  <div className="CommentDateContainer">
                    <h6 className="CommentDate">{formattedDate}</h6>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="CommentsInput">
        <div className="CommentContainer">
          <div className="CommentInputContainer">
            <textarea
              className="CommentInput"
              value={commentContent} // Bind textarea to state
              onChange={handleTextareaChange} // Handle change
            />
            <button
              type="button"
              className="SendSvgrepoCom2"
              onClick={handleCommentSubmit}
              style={{ border: "2px brown solid", background: "none" }}
            >
              <img
                alt="Send"
                className="Vector"
                src="/src/assets/icons/vector.svg"
              />
            </button>
          </div>
          <div className="UserInfo">
            <img
              alt="avatar"
              className="Avatar2"
              src="https://avatars.githubusercontent.com/u/97165289"
            />
            <h6 className="Username">{user?.name}</h6>
          </div>
        </div>
      </div>
    </section>
  );
}

CommentsSection.propTypes = {
  filmId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentsSection;
