import { MiddlePart } from "./MiddlePart/MiddlePart";
import { Sidebar } from "./Layout/Sidebar";
import { CreateDiv } from "./Layout/CreateDiv";
import { LoadingScreen } from "./Layout/LoadingScreen";
import { Logo, CreateButton } from "./Layout/Logo";
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
  const [username, setusername] = useState(null);
  const [userProfilePic, serUserProfilePic] = useState("");
  const [messageName, setMessageName] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    async function getUser() {
      const data = await fetch_user();
      setusername(data.username);
      serUserProfilePic(data.profile_pic);
    }
    getUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        createButtonOn,
        setCreateButtonOn,
        loading,
        setLoading,
        username,
        userProfilePic,
        showMessage,
        setShowMessage,
        messageName,
        setMessageName,
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
      <Routes key={location.pathname}>
        <Route path="/" element={<MiddlePart key={Date.now()} />} />
        <Route path="/login" element={<Login key={Date.now()} />} />
        <Route path="/register" element={<Register key={Date.now()} />} />
      </Routes>
    </>
  );
}

async function fetch_user() {
  try {
    const response = await fetch("/api/user_info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //TODO: remove
    });
    const response_json = await response.json();
    return response_json;
  } catch (error) {
    console.log("user_not_found");

    console.error(error);
  }
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
