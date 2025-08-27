import { MiddlePart } from "./MiddlePart/MiddlePart";
import { Sidebar } from "./Layout/Sidebar";
import { CreateDiv } from "./CreateDiv";
import { LoadingScreen } from "./LoadingScreen";
import { Logo, CreateButton } from "./Layout/Logo";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState, createContext, useContext } from "react";
import "./App.css";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [createButtonOn, setCreateButtonOn] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        createButtonOn,
        setCreateButtonOn,
        loading,
        setLoading,
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
      <CreateDiv />
      <LoadingScreen />
      <Routes key={location.pathname}>
        <Route path="/" element={<MiddlePart key={Date.now()} />} />
        {/* Route for the landing page, mapped to the "/" path */}
        {/* <Route */}
        {/* path="/neet/online-coaching-class-11" */}
        {/* element={<Class11Program />} */}
        {/* />{" "} */}
        {/* Route for Class 11 NEET program page */}
        {/* <Route
            path="/neet/online-coaching-class-12"
            element={<Class12Program />}
          />{" "} */}
        {/* Route for Class 12 NEET program page */}
        {/* <Route path="*" element={<ErrorPage />} />{" "} */}
        {/* Route for handling unmatched paths, rendering a 404 error page */}
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
