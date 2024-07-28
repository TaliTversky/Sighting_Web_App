import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import mecoIcon from "../../images/meco-icon.png";
import homeIcon from "../../images/home-icon.png";
import imagesIcon from "../../images/images-icon.png";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="mecoIcon">
        <img src={mecoIcon} alt="mecoIcon" />
      </div>
      <div className="iconBar">
        <Link to="/">
          <img src={homeIcon} alt="home" />
        </Link>
        <Link to="/page1">
          <img src={imagesIcon} alt="images" />
        </Link>
        <Link to="/page2">
          <img src={imagesIcon} alt="images" />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
