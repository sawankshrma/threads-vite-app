import { usecontent, createContext, useContext, useState } from "react";
import { CreateButtonContext } from "./App";
import { X } from "lucide-react";

export function CreateDiv() {
  const { createButtonOn, setCreateButtonOn } = useContext(CreateButtonContext);
  const [content, setcontent] = useState({
    body: "",
    image_url: "",
  });

  function submit() {
    fetch("http://localhost:5173/api/create_post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //TODO: remove
      body: JSON.stringify({
        body: content.body,
        image_url: content.image_url,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        return { status: response.status, data: data };
      })
      .then((result) => {
        console.log(result.data);
        if (result.status === 201) {
          console.log("sent");
          setCreateButtonOn(false);
        } else {
          console.log("not sent!");
          return alert(`${result.data.error}`);
        }
      });
  }

  function toggle() {
    setCreateButtonOn(false);
  }

  return createButtonOn ? (
    <div
      style={{
        zIndex: "15",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: "0vw",
        top: "0vh",
        background: "rgba(0,0,0, 0.2)",
        backdropFilter: "blur(7px)",
      }}
    >
      <X
        onClick={toggle}
        className="text-white w-6 h-6 options"
        color="white"
        size={50}
        strokeWidth={2.5}
        style={{
          zIndex: "15",
          position: "fixed",
          top: "2vh",
          right: "2vw",
        }}
      />

      <div
        style={{
          zIndex: "15",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "550px",
          width: "90vw",
          minHeight: "33vh",
          maxHeight: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(13, 19, 20, 0.95)",
          backdropFilter: "blur(15px)",
          border: " solid 1px rgba(51, 51, 51, 1)",
          borderRadius: "20px",
        }}
      >
        <div
          className="header"
          style={{
            width: "100%",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "16px",
            padding: "13px 0",
            display: "flex",
            justifyContent: "center",
            borderBottom: "solid 1px rgba(61, 61, 61, 1)",
          }}
        >
          <b>New Post</b>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <input
            id="body"
            style={{
              width: "90%",
              padding: "8px",
              fontSize: "14px",
            }}
            placeholder="What's On your Mind"
            value={content.body}
            onChange={(event) => {
              setcontent({
                ...content,
                body: event.target.value,
              });
              console.log(content); //TODO: remove
            }}
          />
          <input
            id="image_url"
            style={{
              width: "90%",
              padding: "8px",
              fontSize: "14px",
            }}
            placeholder="Image URL (optional)"
            value={content.image_url}
            type="url"
            onChange={(event) => {
              setcontent({
                ...content,
                image_url: event.target.value,
              });
              console.log(content); //TODO: remove
            }}
          />
          <button onClick={submit}>submit</button>
        </div>
      </div>
    </div>
  ) : null;
}
