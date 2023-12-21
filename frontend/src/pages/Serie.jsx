import { useParams, NavLink } from "react-router-dom";
import { useSeries } from "../contexts/SerieContext";

function Serie() {
  const { serieId } = useParams();
  const { series } = useSeries();

  if (!serieId) {
    return <h1>Aucune série trouvée.</h1>;
  }
  return (
    <>
      {series
        .filter((serie) => {
          return serie.id === parseInt(serieId, 10);
        })
        .map((serie) => {
          if (serie.isAvailable) {
            return (
              <div className="serie-page-details" key={parseInt(serieId, 10)}>
                <div className="serie-information-display">
                  <div className="thumbnail-container">
                    <img
                      className="serie-cover"
                      src={serie.cover}
                      alt={serie.title}
                    />
                    <div className="upper-layer">
                      <NavLink
                        className="play-button-container"
                        to={`/seriePlayer/${serie.id}`}
                      >
                        <img
                          className="play-button"
                          src="/src/assets/icons/play_button_icon.svg"
                          alt="play button"
                        />
                      </NavLink>
                    </div>
                  </div>
                  <div className="details-option-wrapper">
                    <div className="details-container">
                      <p className="serie-info release-year">{serie.year}</p>
                      <p className="separator">•</p>
                      <p className="serie-info duration">{serie.duration}m</p>
                    </div>
                  </div>
                  <div className="description-container">
                    <p className="serie-title">{serie.title}</p>
                    <p className="serie-description">{serie.description}</p>
                  </div>
                  <div className="comments-section">
                    <div className="comments-section-title">
                      <p className="comments-section-title-text">
                        Commentaires
                      </p>
                    </div>
                    <div className="comments-section-content">
                      <div className="registration-invitation-container">
                        <p className="registration-invitation">
                          Connectez-vous pour laisser un commentaire.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div
              className="serie-page-details"
              key={parseInt(serieId, 10)}
              style={{ overflowY: "hidden" }}
            >
              <div className="serie-information-display-wrapper">
                <div className="serie-information-display">
                  <div className="thumbnail-container">
                    <img
                      className="serie-cover"
                      src={serie.cover}
                      alt={serie.title}
                    />
                    <div className="upper-layer">
                      <div className="play-button-container">
                        <img
                          className="play-button"
                          src="/src/assets/icons/play_button_icon.svg"
                          alt="play button"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="details-option-wrapper">
                    <div className="details-container">
                      <p className="serie-info release-year">{serie.year}</p>
                      <p className="separator">•</p>
                      <p className="serie-info duration">{serie.duration}m</p>
                    </div>
                  </div>
                  <div className="description-container">
                    <p className="serie-title">{serie.title}</p>
                    <p className="serie-description">{serie.description}</p>
                  </div>
                  <div className="comments-section">
                    <div className="comments-section-title">
                      <p className="comments-section-title-text">
                        Commentaires
                      </p>
                    </div>
                    <div className="comments-section-content">
                      <div className="registration-invitation-container">
                        <p className="registration-invitation">
                          Connectez-vous pour laisser un commentaire.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="upper-layer">
                  <div className="registration-invitation-container">
                    <p className="registration-invitation">
                      Connectez-vous pour regarder ce film.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Serie;
