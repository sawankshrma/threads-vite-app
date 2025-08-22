import { MiddlePart } from "./MiddlePart";
import { Sidebar } from "./Sidebar";
import { Logo, CreateButton } from "./Logo";

function App() {
  return (
    <div
      style={{
        width: "98vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Logo />
      <CreateButton />
      <Sidebar />
      <MiddlePart />
    </div>
  );
}

// Export the App component to use it in the other files
export default App;
