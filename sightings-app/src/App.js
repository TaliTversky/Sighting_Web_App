import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; //this is for the login screen design
import HeadBar from "./components/headerBar/HeaderBar";
import SideBar from "./components/sideBar/SideBar";
import "./App.css";

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
