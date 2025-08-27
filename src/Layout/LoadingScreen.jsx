import { useContext } from "react";
import { GlobalContext } from "../App";

export function LoadingScreen() {
  const { loading } = useContext(GlobalContext);

  if (!loading) return null;

  return (
    <div
      style={{
        zIndex: 50,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader" />
      <style>
        {`
          .loader {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
