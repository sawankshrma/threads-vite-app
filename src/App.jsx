import { MiddlePart } from "./MiddlePart/MiddlePart";
import { Sidebar } from "./Layout/Sidebar";
import { CreateDiv } from "./CreateDiv";
import { Logo, CreateButton } from "./Layout/Logo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, createContext, useContext } from "react";

export const CreateButtonContext = createContext();
// export const CreateFollowingContext = createContext();

function CreateButtonProvider({ children }) {
  const [createButtonOn, setCreateButtonOn] = useState(false);
  return (
    <CreateButtonContext.Provider
      value={{
        createButtonOn,
        setCreateButtonOn,
      }}
    >
      {children}
    </CreateButtonContext.Provider>
  );
}
// function CreateFollowingProvider({ children }) {
//   const [following, setFollowing] = useState(false);

//   return (
//     <CreateFollowingContext.Provider
//       value={{
//         following,
//         setFollowing,
//       }}
//     >
//       {children}
//     </CreateFollowingContext.Provider>
//   );
// }

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
      <CreateButtonProvider>
        <BrowserRouter>
          <Logo />
          <CreateButton />
          <Sidebar />
          <CreateDiv />
          <Routes>
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
        </BrowserRouter>
      </CreateButtonProvider>
      {/* </CreateFollowingProvider> */}
    </div>
  );
}

// Export the App component to use it in the other files
export default App;
