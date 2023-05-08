import React, { useState } from "react";
import getHashParams from "../static/hash";
import "../static/form.css";

function RecommendationForm({ spotifyApi }) {
  const [genres, setGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const validGenres = [
    "acoustic",
    "afrobeat",
    "alt-rock",
    "alternative",
    "ambient",
    "anime",
    "black-metal",
    "bluegrass",
    "blues",
    "bossanova",
    "brazil",
    "breakbeat",
    "british",
    "cantopop",
    "chicago-house",
    "children",
    "chill",
    "classical",
    "club",
    "comedy",
    "country",
    "dance",
    "dancehall",
    "death-metal",
    "deep-house",
    "detroit-techno",
    "disco",
    "disney",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "folk",
    "forro",
    "french",
    "funk",
    "garage",
    "german",
    "gospel",
    "goth",
    "grindcore",
    "groove",
    "grunge",
    "guitar",
    "happy",
    "hard-rock",
    "hardcore",
    "hardstyle",
    "heavy-metal",
    "hip-hop",
    "holidays",
    "honky-tonk",
    "house",
    "idm",
    "indian",
    "indie",
    "indie-pop",
    "industrial",
    "iranian",
    "j-dance",
    "j-idol",
    "j-pop",
    "j-rock",
    "jazz",
    "k-pop",
    "kids",
    "latin",
    "latino",
    "malay",
    "mandopop",
    "metal",
    "metal-misc",
    "metalcore",
    "minimal-techno",
    "movies",
    "mpb",
    "new-age",
    "new-release",
    "opera",
    "pagode",
    "party",
    "philippines-opm",
    "piano",
    "pop",
    "pop-film",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "r-n-b",
    "rainy-day",
    "reggae",
    "reggaeton",
    "road-trip",
    "rock",
    "rock-n-roll",
    "rockabilly",
    "romance",
    "sad",
    "salsa",
    "samba",
    "sertanejo",
    "show-tunes",
    "singer-songwriter",
    "ska",
    "sleep",
    "songwriter",
    "soul",
    "soundtracks",
    "spanish",
    "study",
    "summer",
    "swedish",
    "synth-pop",
    "tango",
    "techno",
    "trance",
    "trip-hop",
    "turkish",
    "work-out",
    "world-music",
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const recommendationsData = await spotifyApi.getRecommendations({
        seed_genres: genres.slice(0, 5).join(","),
      });

      setRecommendations(recommendationsData.tracks);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddToPlaylist() {
    const params = getHashParams();
    const token = params.access_token;

    if (token) {
      try {
        spotifyApi.setAccessToken(token);

        const user = await spotifyApi.getMe();

        const playlist = await spotifyApi.createPlaylist(user.id, {
          name: "Recommendations",
        });
        const tracks = recommendations.map(
          (recommendation) => recommendation.uri
        );
        await spotifyApi.addTracksToPlaylist(playlist.id, tracks);
        alert("Songs added to playlist!");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rec-form">
      <div className="genre">
        <label classame="genre-lbl" htmlFor="genres">
          Genre:
        </label>
        <select
          className="genre-select"
          id="genres"
          value={genres}
          onChange={(e) => setGenres([e.target.value])}
        >
          <option className="genre-option" value="">
            Select a genre
          </option>
          {validGenres.map((genre) => (
            <option className="genre-option" key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <button className="submit-btn" type="submit">
        Get Recommendations
      </button>
      <div className="recommendations-container">
        {recommendations.length > 0 && (
          <>
            <h2 className="recommendations-heading">Recommendations:</h2>
            <ul className="recommendations-ul">
              {recommendations.map((recommendation) => (
                <li key={recommendation.id}>
                  {recommendation.name} - {recommendation.artists[0].name}
                </li>
              ))}
            </ul>
            <button
              className="add-btn"
              type="button"
              onClick={handleAddToPlaylist}
            >
              Add to Playlist
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default RecommendationForm;
