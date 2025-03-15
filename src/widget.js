import React from "react";
import ReactDOM from "react-dom/client";
import FeedbackWidget from "./FeedbackWidget"; // Ensure this is the correct path

const init = () => {
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "feedback-widget-container";
  document.body.appendChild(widgetContainer);

  const root = ReactDOM.createRoot(widgetContainer);
  root.render(<FeedbackWidget />);
};

// Expose it globally
window.FeedbackWidget = { init };
