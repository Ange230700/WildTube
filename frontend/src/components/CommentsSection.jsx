function CommentsSection() {
  return (
    <section className="CommentsSection">
      <div className="CommentsSectionTitle">
        <div className="Commentaires">Commentaires</div>
      </div>
      <div className="CommentsWrapper">
        <div className="CommentContainer">
          <div className="UserInfo">
            <img
              alt=""
              className="Avatar2"
              src="https://via.placeholder.com/46x46"
            />
            <div className="Username">username</div>
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
          <input
            className="CommentInput"
            placeholder="ajouter votre commentaire..."
          />
          <div className="SendSvgrepoCom2">
            <img alt="" className="Vector" />
          </div>
          <div className="UserInfo">
            <img
              alt=""
              className="Avatar2"
              src="https://via.placeholder.com/32x32"
            />
            <p className="Username">username</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;
