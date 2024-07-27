import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import SiteFooter from "./components/common/SiteFooter";
// import HomePage from "./components copy/home/HomePage";
// import SightingPage from "./components/Sightings/SightingPage";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
// import { Amplify } from "aws-amplify";
// import { signOut } from "aws-amplify/auth";
// import { generateClient } from "aws-amplify/api";
// import config from "./amplifyconfiguration";
// import awsmobile from "./aws-exports";
// import { StorageImage, StorageManager } from "@aws-amplify/ui-react-storage";
// import SideBar from "./components copy/common/sideBar/SideBar";
// import HeadBar from "./components copy/common/HeaderBar/HeaderBar";
import HeadBar from "./components copy/headerBar/HeaderBar";
import SideBar from "./components copy/sideBar/SideBar";

const App = ({ signOut, user }) => {
  return (
    <>
      <div className="App">
        <HeadBar logOut={signOut} />
        <SideBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default withAuthenticator(App);
