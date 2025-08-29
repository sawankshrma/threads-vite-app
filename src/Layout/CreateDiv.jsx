import {
  usecontent,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { GlobalContext } from "../App";
import { X } from "lucide-react";
import profileImg from "../assets/836.jpg";
import "./CreateDiv.css";
import { Message } from "./Message";

export function CreateDiv() {
  const {
    createButtonOn,
    setCreateButtonOn,
    loading,
    setLoading,
    username,
    userProfilePic,
    setShowMessage,
    setMessageName,
  } = useContext(GlobalContext);
  const [content, setcontent] = useState({
    body: "",
    image_url: "",
  });

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (createButtonOn && textAreaRef.current) {
      textAreaRef.current.focus();
    }
    if (createButtonOn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [createButtonOn]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        toggle();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function submit() {
    setLoading(true);

    fetch("/api/create_post", {
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
          setcontent({
            body: "",
            image_url: "",
          });
          setLoading(false);
          setCreateButtonOn(false);
          setMessageName("Posted Successfully");
          setShowMessage(true);
          return;
        } else {
          console.log("not sent!");
          setLoading(false);
          setMessageName(`${result.data.error}!`);
          setShowMessage(true);
          return;
          // return alert(`${result.data.error}`);
        }
      });
  }

  function toggle() {
    setCreateButtonOn(false);
  }

  const [profileUrl, setProfileUrl] = useState({ profileImg });

  useEffect(() => {
    // console.log(`profile=  ${userProfilePic}`);
    const url = userProfilePic;
    if (url !== "") setProfileUrl(`${userProfilePic}`);
    else setProfileUrl(profileImg);
  }, [createButtonOn]); // createButtonOn bcz for the first time the profile pic might not have loaded,, but i need to give it a chance when i click on the + button every time..

  return createButtonOn ? (
    <div className="create-div-overlay">
      <X
        onClick={toggle}
        className="text-white w-6 h-6 options create-div-close"
        color="white"
        size={50}
        strokeWidth={2.5}
      />

      <div className="create-div-modal">
        <div className="header create-div-header">
          <b>New Post</b>
        </div>
        <div className="create-div-content" style={{ width: "95%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: "white",
            }}
          >
            <div>
              <img src={profileUrl} className="profile-pic" />
            </div>
            <div
              style={{
                marginLeft: 10,
                marginRight: 10,
                width: "100%",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ fontSize: 18, fontFamily: "monospace" }}>
                  <b>{username} </b>
                </div>
              </div>

              <div>
                <textarea
                  ref={textAreaRef}
                  id="body"
                  className="create-div-input-body"
                  placeholder="What's happening?"
                  value={content.body}
                  onChange={(event) => {
                    setcontent({
                      ...content,
                      body: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="submiting-div"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <input
              id="image_url"
              className="create-div-input"
              placeholder="Image URL (optional)"
              value={content.image_url}
              type="url"
              onChange={(event) => {
                setcontent({
                  ...content,
                  image_url: event.target.value,
                });
              }}
            />
            <button className="submit-btn" onClick={submit}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
