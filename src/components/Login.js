import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", username);
      window.location.href = data.role === "admin" ? "/admin" : "/";
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #4A90E2, #50E3C2)",
  },
  loginBox: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

styles.button[":hover"] = {
  background: "#357ABD",
};

export default Login;



