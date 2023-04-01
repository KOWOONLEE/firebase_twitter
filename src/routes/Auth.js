import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { theme } from "../color";
import { auth } from "../myBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        //create new account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //login
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setErrorMessage(error.message.replace("Firebase: ", ""));
    }
  };
  const selectToggle = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <StyledAuth>
      <div className="AuthWrap">
        <div className="emailSign">
          <div className="birdIcon">
            <FiTwitter />
          </div>
          <div className="emailSubmit">
            <form className="submitForm" onSubmit={handleSubmit}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={handleLogin}
                className="inputBlock"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={handleLogin}
                autoComplete="off"
                className="inputBlock"
              />
              <input
                className="submitBtn"
                type="submit"
                value={newAccount ? "Create Account" : "Sign-in"}
              />
              {errorMessage}
              <div className="selectToggle">
                <div onClick={selectToggle}>
                  {newAccount ? "Sign-in" : "Create Account"}
                </div>
              </div>
            </form>
          </div>
          <div className="socialBtn">
            <button name="google" onClick={onSocialClick}>
              <span>Continue with Google</span>
              <FcGoogle />
            </button>
            <button name="github" onClick={onSocialClick}>
              <span>Continue with Github</span> <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </StyledAuth>
  );
};
export default Auth;

const StyledAuth = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${theme.bg};

  .AuthWrap {
    display: flex;
    width: 100%;
    height: 97vh;
    justify-content: center;
    align-items: center;
  }
  .emailSign {
    /* width: 80%; */
    padding: 5vh;
    background-color: ${theme.bg};
    cursor: pointer;
  }
  .birdIcon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 6vw;
      height: 6svh;
      margin-bottom: 2vh;
      fill: ${theme.red};
    }
  }

  .selectToggle {
    display: flex;
    justify-content: center;
    font-size: 1.2em;
    margin: 2vh;
    text-decoration: underline;
    color: ${theme.red};
    font-weight: 600;
  }
  .emailSubmit {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .submitForm {
    display: block;
  }

  .inputBlock {
    display: block;
    width: 20vw;
    height: 4vh;
    margin-top: 1vh;
    padding-left: 1vw;
    font-size: 1em;
    background-color: ${theme.beige};
    border: none;
    border-radius: 10px;
  }
  .submitBtn {
    width: 21vw;
    height: 4vh;
    margin-top: 2vh;
    font-size: 1em;
    background-color: ${theme.red};
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .socialBtn {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1vh;

    button {
      border: none;
      margin-left: 1vw;
      padding: 5px;
      background-color: ${theme.beige};
      border-radius: 20px;

      span {
        margin-left: 10px;
      }
      svg {
        width: 3vw;
        height: 3vh;
        vertical-align: middle;
      }
    }
  }
`;
