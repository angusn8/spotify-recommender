import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import NavBar from "./components/NavBar";
import RecommendationForm from "./components/RecommendationForm";
import Intro from "./components/Intro";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {}).access_token;

    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      setIsLoggedIn(true);
      console.log(isLoggedIn);
    } else {
      setIsLoggedIn(false);
    }
  }, [window.location.search]);

  return (
    <>
      <NavBar />
      {isLoggedIn ? <RecommendationForm spotifyApi={spotifyApi} /> : <Intro />}
    </>
  );
}

export default App;
