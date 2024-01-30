import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";

function CommentsSection({ filmId }) {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [editableComment, setEditableComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const commentsWrapperRef = useRef(null); // Ref for the comments wrapper

  const { user } = useUser();

  const scrollToBottom = () => {
    if (commentsWrapperRef.current) {
      commentsWrapperRef.current.scrollTop =
        commentsWrapperRef.current.scrollHeight;
    }
  };

  const addComment = async (content) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/comments`;
    const commentData = {
      userId: user.id,
      filmId,
      avatarId: user.avatarId,
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

    // After adding comment, scroll to bottom
    scrollToBottom();
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
  useEffect(() => {
    fetchComments();
  }, [filmId]);

  useEffect(() => {
    // Scroll to bottom whenever comments are updated
    scrollToBottom();
  }, [comments]);

  const handleDeleteComment = async (id) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/comments/${id}`;
      await axios.delete(url);

      // Mettez à jour la liste des commentaires après la suppression
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  const handleEditComment = async (commentId) => {
    // Find the comment by id
    const commentToEdit = comments.find((comment) => comment.id === commentId);

    // Set the comment content in the textarea and update editableComment state
    setCommentContent(commentToEdit.content);
    setEditableComment(commentToEdit);
    setIsEditing(true);

    // Implement the editing logic here using editableComment
    if (editableComment) {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/comments/${
          editableComment.id
        }`;
        const updatedCommentData = {
          content: commentContent,
        };

        await axios.put(url, updatedCommentData);

        // Fetch updated comments after editing
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/comments/film/${filmId}`
        );

        setComments(response.data);
      } catch (error) {
        console.error("Error updating comment", error);
      } finally {
        // Reset editableComment state and clear commentContent
        setEditableComment(null);
        setCommentContent("");
        setIsEditing(false);
      }
    }
  };
  if (user) {
    return (
      <section className="CommentsSection">
        <div className="CommentsSectionTitle">
          <h3 className="Commentaires">Comments</h3>
        </div>
        <div className="CommentsWrapper" ref={commentsWrapperRef}>
          {comments.length === 0 ? (
            <h4>Be the first to comment on this movie !</h4>
          ) : (
            comments.map((comment) => {
              const formattedDate = comment.date.slice(0, 19).replace("T", " ");
              const commentKey = `${comment.unique_key}-${comment.id}-${comment.filmId}-${comment.userId}-${comment.avatarId}-${comment.date}`;

              return (
                <div className="CommentContainer" key={commentKey}>
                  {" "}
                  <div className="UserInfo">
                    <img
                      alt={comment.username}
                      className="Avatar2"
                      src={
                        comment.avatar_filename
                          ? `${
                              import.meta.env.VITE_BACKEND_URL
                            }/assets/images/${comment.avatar_filename}`
                          : comment.avatar_url
                      }
                    />
                    <h6 className="Username">{comment.name}</h6>
                  </div>
                  <div className="FrameContainer">
                    <div className="Frame1">
                      <p className="CommentText">{comment.content}</p>
                      {((user && user.id === comment.userId) ||
                        user.IsAdmin) && (
                        <div className="CommentActionButtons">
                          <button
                            type="button"
                            className={`EditButton ${
                              editableComment &&
                              editableComment.id === comment.id
                                ? "colorEditButton"
                                : ""
                            }`}
                            onClick={() => {
                              handleEditComment(comment.id);
                            }}
                            disabled={
                              editableComment &&
                              editableComment.id !== comment.id
                            }
                          >
                            <img
                              src="/src/assets/icons/modifier.png"
                              alt="Modifier"
                            />
                          </button>
                          <button
                            type="button"
                            className="DeleteButton"
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={isEditing}
                          >
                            <img
                              src="/src/assets/icons/supprimer.png"
                              alt="Supprimer"
                            />
                          </button>
                        </div>
                      )}
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
              <input
                className="CommentInput"
                value={commentContent} // Bind textarea to state
                onChange={handleTextareaChange} // Handle change
              />
              <button
                disabled={editableComment}
                type="button"
                className={
                  editableComment
                    ? "SendSvgrepoCom2 disabled"
                    : "SendSvgrepoCom2"
                }
                onClick={handleCommentSubmit}
              >
                <img
                  alt="Send"
                  className="Vector"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/icons/vector.svg`}
                />
              </button>
            </div>
            <div className="UserInfo">
              <img
                alt="avatar"
                className="Avatar2"
                src={
                  user.avatar_filename ||
                  user.avatar_url ||
                  "https://avatars.githubusercontent.com/u/97165289"
                }
              />
              <h6 className="Username">{user.name}</h6>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="CommentsSection">
      <div className="CommentsSectionTitle">
        <h3 className="Commentaires">Comments</h3>
      </div>
      <div className="CommentsWrapper" ref={commentsWrapperRef}>
        {comments.length === 0 ? (
          <h4>Log in to leave a comment.</h4>
        ) : (
          comments.map((comment) => {
            const formattedDate = comment.date.slice(0, 19).replace("T", " ");
            const commentKey = `${comment.unique_key}-${comment.id}-${comment.film_id}-${comment.user_id}-${comment.avatar_id}-${comment.content}-${comment.date}`;

            return (
              <div className="CommentContainer" key={commentKey}>
                {" "}
                <div className="UserInfo">
                  {/* <img
                    alt={comment.username}
                    className="Avatar2"
                    src={
                      comment.avatar_filename
                        ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                            comment.avatar_filename
                          }`
                        : comment.avatar_url
                    }
                  />
                  <h6 className="Username">{comment.name}</h6> */}
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

      {/* Let know the guest that they should log in to write comments */}
      <div className="CommentsInput">
        <div className="CommentContainer">
          <div className="CommentInputContainer">
            <textarea
              className="CommentInput"
              placeholder="Log in to leave a comment"
              disabled
            />
            <button type="button" className="SendSvgrepoCom2" disabled>
              <img
                alt="Send"
                className="Vector"
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/assets/icons/vector.svg`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

CommentsSection.propTypes = {
  filmId: PropTypes.number,
};

CommentsSection.defaultProps = {
  filmId: null,
};

export default CommentsSection;
