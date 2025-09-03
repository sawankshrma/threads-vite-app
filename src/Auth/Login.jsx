import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../App";
import { Message } from "../Layout/Message";
import { LoadingScreen } from "../Layout/LoadingScreen";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

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
  });

  function submit() {
    setLoading(true);

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: content.username,
        password: content.password,
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
      <div className="create-div-modalnew">
        <div className="headernew create-div-headernew">
          <b>LogIn</b>
        </div>
        <div className="create-div-contentnew" style={{ width: "95%" }}></div>
        <input
          id="username"
          className="create-div-inputnew"
          placeholder="Username"
          value={content.username}
          onChange={(event) => {
            setcontent({
              ...content,
              username: event.target.value,
            });
          }}
        />
        <input
          id="Password"
          className="create-div-inputnew"
          placeholder="Password"
          value={content.password}
          type="password"
          onChange={(event) => {
            setcontent({
              ...content,
              password: event.target.value,
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
            LogIn
          </button>
        </div>
      </div>
      <div className="redirectnew">
        New User?{" "}
        <Link to="/register">
          <b>Register</b>
        </Link>
      </div>
    </div>
  );
}
