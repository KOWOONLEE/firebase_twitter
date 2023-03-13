import React, { useState } from "react";
import { auth } from "../myBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={handleLogin}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={handleLogin}
            autoComplete="off"
          />
          <input
            type="submit"
            value={newAccount ? "Create Account" : "Log-in"}
          />
          {errorMessage}
        </form>
      </div>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </>
  );
};
export default Auth;
