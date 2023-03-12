import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    console.log(email);
    console.log(password);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="text"
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
          />
          <input type="submit" value="Log in" />
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
