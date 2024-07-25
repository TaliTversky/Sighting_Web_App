import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import mecoIcon from "../images/meco-icon.png";
import homeIcon from "../images/home-icon.png";
import imagesIcon from "../images/images-icon.png";
import binocularsIcon from "../images/binoculars-icon2.png";

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
        <Link to="/">
          <img src={imagesIcon} alt="images" />
        </Link>
        <Link to="/AllSightings">
          <img src={binocularsIcon} alt="sightings" />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;