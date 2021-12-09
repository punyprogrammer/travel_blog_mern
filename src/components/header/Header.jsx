import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg"> The travellers blog</span>
        <span className="headerTitleSm">
          “Man cannot discover new oceans unlesss{" "}
        </span>
        <span className="headerTitleSm2">
          he has the courage to lose sight of the shore”{" "}
        </span>
      </div>
      <img
        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        alt=""
        className="headerImg"
      />
    </div>
  );
};

export default Header;
