import { MiddlePart } from "./MiddlePart/MiddlePart";
import { Sidebar } from "./Layout/Sidebar";
import { CreateDiv } from "./Layout/CreateDiv";
import { ShowImage } from "./Layout/ShowImage";
import { LoadingScreen } from "./Layout/LoadingScreen";
import { Logo, CreateButton, Github } from "./Layout/Logo";
import { Message } from "./Layout/Message";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import "./App.css";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [createButtonOn, setCreateButtonOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState("");
  const [messageName, setMessageName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [csrftoken, setCsrftoken] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        createButtonOn,
        setCreateButtonOn,
        loading,
        setLoading,
        userName,
        setUserName,
        setUserProfilePic,
        userProfilePic,
        showMessage,
        setShowMessage,
        messageName,
        setMessageName,
        showImg,
        setShowImg,
        imgURL,
        setImgURL,
        csrftoken,
        setCsrftoken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Logo />
      <CreateButton />
      <Sidebar />
      <Message />
      <CreateDiv />
      <LoadingScreen />
      <ShowImage />
      <Github />
      <Routes key={location.pathname}>
        <Route
          path="/"
          element={<MiddlePart type="normal" key={Date.now()} />}
        />
        <Route path="/login" element={<Login key={Date.now()} />} />
        <Route path="/register" element={<Register key={Date.now()} />} />
        <Route
          path="/u/:profile_userName"
          element={<MiddlePart type="profile_page" />}
          key={Date.now()}
        />
        <Route
          path="/liked"
          element={<MiddlePart type="liked_page" />}
          key={Date.now()}
        />

        <Route
          path="*"
          element={
            <h1 style={{ color: "white", margintop: "10vh" }}>Not Found</h1>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div
      style={{
        width: "98vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* <CreateFollowingProvider> */}
      <GlobalContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GlobalContextProvider>
      {/* </CreateFollowingProvider> */}
    </div>
  );
}

// Export the App component to use it in the other files
export default App;
