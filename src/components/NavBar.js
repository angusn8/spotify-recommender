import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import getHashParams from "../static/hash";
import Header from "./Header";
import "../static/navbar.css";
import logo from "../static/spotifylogo.png";

const spotifyApi = new SpotifyWebApi();

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);

      spotifyApi.getMe().then((data) => {
        setUser(data);
        setLoggedIn(true);
      });
    }
  }, []);

  function getHashParams() {
    const hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  function handleLogin() {
    const client_id = "d6d93726caa346d8b82119c2362ec1dc";
    const redirect_uri =
      "https://spotify-song-recommender-phi.vercel.app/callback";
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-library-read",
      "playlist-read-private",
      "playlist-modify-private",
      "playlist-modify-public",
    ];
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scopes.join(
      "%20"
    )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

    window.location.href = url;
  }

  function handleLogout() {
    spotifyApi.setAccessToken(null);
    setLoggedIn(false);
    setUser(null);
    window.history.replaceState({}, document.title, window.location.pathname);
    window.location.href = window.location.origin;
  }

  return (
    <>
      <div className="nav-container">
        <h1>HarmonIQ</h1>
        {loggedIn ? (
          <div>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="nav-btn" onClick={handleLogin}>
            Login with Spotify
          </button>
        )}
      </div>
      <Header user={user} />
    </>
  );
}

export default NavBar;
