import React from "react";
import "../static/header.css";

function Header(props) {
  const { user } = props;

  return (
    <div className="header-container">
      {user ? (
        <p>You are logged in as {user.display_name}.</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default Header;
