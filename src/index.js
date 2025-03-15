import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FeedbackWidget from "./FeedbackWidget";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Function to dynamically render the feedback widget
window.renderFeedbackWidget = (containerId) => {
  const widgetRoot = document.getElementById(containerId);
  if (widgetRoot) {
    const widget = ReactDOM.createRoot(widgetRoot);
    widget.render(
      <React.StrictMode>
        <FeedbackWidget />
      </React.StrictMode>
    );
  } else {
    console.error(`Container with ID '${containerId}' not found.`);
  }
};

// Report performance metrics
reportWebVitals();
