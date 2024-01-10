function CommentsSection() {
  return (
    <section className="CommentsSection">
      <div className="CommentsSectionTitle">
        <h3 className="Commentaires">Commentaires</h3>
      </div>
      <div className="CommentsWrapper">
        <div className="CommentContainer">
          <div className="UserInfo">
            <img
              alt=""
              className="Avatar2"
              src="https://via.placeholder.com/46x46"
            />
            <h6 className="Username">username</h6>
          </div>
          <div className="FrameContainer">
            <div className="Frame1">
              <p className="CommentText">Ce film est formidable!</p>
            </div>
            <div className="CommentDateContainer">
              <h6 className="CommentDate">23-07-2023</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="CommentsInput">
        <div className="CommentContainer">
          <div className="CommentInputContainer">
            <textarea className="CommentInput" />
            <button type="button" className="SendSvgrepoCom2">
              <img
                alt="Send"
                className="Vector"
                src="/src/assets/icons/vector.svg"
              />
            </button>
          </div>
          <div className="UserInfo">
            <img
              alt=""
              className="Avatar2"
              src="https://via.placeholder.com/32x32"
            />
            <h6 className="Username">username</h6>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;
