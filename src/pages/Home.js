import React from "react";

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "20px",
  },
  link: {
    display: "inline-block",
    textDecoration: "none",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "18px",
    transition: "0.3s",
  },
  linkHover: {
    backgroundColor: "#0056b3",
  },
};

const Home = () => (
  <div style={styles.container}>
    <h1 style={styles.heading}>Welcome to Dynamic Feedback Widget</h1>
    <a
      href="/widget"
      style={styles.link}
      onMouseEnter={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
      onMouseLeave={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
    >
      Open Feedback Widget
    </a>
  </div>
);

export default Home;
