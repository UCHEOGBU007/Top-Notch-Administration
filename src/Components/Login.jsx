import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../Css/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      navigate("/Admin");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={Styles.container}>
      <header className={Styles.header}>
        <img src="/Logo.jpg" alt="Top Notch Logo" className={Styles.logo} />
      </header>
      <main className={Styles.main}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2 className={Styles.title}>Admin Login</h2>

          <label htmlFor="username" className={Styles.label}>
            Username :
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className={Styles.input}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" className={Styles.label}>
            Password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className={Styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={Styles.button}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
