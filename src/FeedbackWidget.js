import React, { useEffect, useState } from "react";

const FeedbackWidget = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions/published")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setQuestion(data[Math.floor(Math.random() * data.length)]);
        }
      })
      .catch((err) => console.error("Error fetching question:", err));
  }, []);

  const handleSubmit = () => {
    if (!question) return;

    fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: question._id, answer }),
    })
      .then((res) => res.json())
      .then(() => setSubmitted(true))
      .catch((err) => console.error("Error submitting feedback:", err));
  };

  return (
    <div>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : question ? (
        <div>
          <p>{question.text}</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your feedback"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default FeedbackWidget;
