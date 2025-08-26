import { MiddlePart } from "./MiddlePart/MiddlePart";
import { Sidebar } from "./Layout/Sidebar";
import { Logo, CreateButton } from "./Layout/Logo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [createPostOpen, serCreatePostOpen] = useState(false);

  return (
    <div
      style={{
        width: "98vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Wrap the routing inside BrowserRouter, which manages the routing history */}
      <BrowserRouter>
        {/* Create navigation links using Link component to switch between pages without refreshing */}
        {/* <Link to="/">Allen</Link> |{" "}
        <Link to="/neet/online-coaching-class-11">Class 11</Link> |{" "}
        <Link to="/neet/online-coaching-class-12">Class 12</Link> */}
        <Logo />
        <CreateButton />
        <Sidebar />
        {/* <CreatePost /> */}
        {/* Define the routes for different pages */}
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
    </div>
  );
}

// Export the App component to use it in the other files
export default App;
