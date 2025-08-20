import { MiddlePart } from "./MiddlePart";
import { Sidebar } from "./Sidebar";
function App() {
  return (
    <div
      style={{
        width: "98vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Sidebar />
      <MiddlePart />
    </div>
  );
}

// Export the App component to use it in the other files
export default App;
