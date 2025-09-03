import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../App";
import { Message } from "../Layout/Message";
import { LoadingScreen } from "../Layout/LoadingScreen";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   function handleKeyDown(e) {
  //     if (e.key === "Enter") {
  //       submit();
  //     }
  //   }
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

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
    username: "",
    password: "",
    email: "",
    confirmation: "",
    profile_pic_url: "",
  });

  function submit() {
    setLoading(true);

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: content.username,
        password: content.password,
        confirmation: content.confirmation,
        email: content.email,
        profile_pic_url: content.profile_pic_url,
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
            username: "",
            password: "",
          });
          setLoading(false);
          setMessageName("Login Successfull");
          setShowMessage(true);
          setTimeout(() => {
            navigate("/");
          }, 500);
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

  return (
    <div className="create-div-overlaynew">
      <div
        className="create-div-modalnew"
        style={{ maxWidth: "500px", height: "370px" }}
      >
        <div className="headernew create-div-headernew">
          <b>Register</b>
        </div>
        <div className="create-div-contentnew"></div>
        <input
          id="username"
          className="create-div-inputnew create-div-input-registernew"
          placeholder="Choose a Username"
          value={content.username}
          onChange={(event) => {
            setcontent({
              ...content,
              username: event.target.value,
            });
          }}
        />
        <input
          id="Password1"
          className="create-div-inputnew create-div-input-registernew"
          placeholder="Set a Password"
          value={content.password}
          type="password"
          onChange={(event) => {
            setcontent({
              ...content,
              password: event.target.value,
            });
          }}
        />
        <input
          id="Password2"
          className="create-div-inputnew create-div-input-registernew"
          placeholder="Confirm Password"
          value={content.confirmation}
          type="password"
          onChange={(event) => {
            setcontent({
              ...content,
              confirmation: event.target.value,
            });
          }}
        />
        <input
          id="email"
          className="create-div-inputnew create-div-input-registernew"
          placeholder="Email"
          value={content.email}
          type="email"
          onChange={(event) => {
            setcontent({
              ...content,
              email: event.target.value,
            });
          }}
        />
        <input
          id="profile_pic_url"
          className="create-div-inputnew create-div-input-registernew"
          placeholder="Profile Pic URL (optional)"
          value={content.profile_pic_url}
          type="URL"
          onChange={(event) => {
            setcontent({
              ...content,
              profile_pic_url: event.target.value,
            });
          }}
        />

        <div
          className="submiting-divnew"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column  ",
            alignItems: "center",
          }}
        >
          <button className="submit-btnnew" onClick={submit}>
            Register
          </button>
        </div>
      </div>
      <div className="redirect1new">
        Already a User?{" "}
        <Link to="/logIn">
          <b>LogIn</b>
        </Link>
      </div>
    </div>
  );
}
