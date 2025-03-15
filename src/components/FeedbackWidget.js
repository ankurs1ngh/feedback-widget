import React, { useEffect, useState } from "react";

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "15px",
    fontSize: "18px",
  },
  optionContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    marginTop: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  stars: {
    display: "flex",
    gap: "5px",
    cursor: "pointer",
  },
  star: {
    fontSize: "24px",
    color: "#ccc",
  },
  selectedStar: {
    color: "#ffcc00",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
};

const FeedbackWidget = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [textFeedback, setTextFeedback] = useState(""); // Added separate text feedback state
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

    const payload = {
      questionId: question._id,
      answer:
        question.type === "rating"
          ? selectedRating
          : question.type === "multiple"
          ? selectedOptions
          : question.type === "single"
          ? selectedOptions[0] || ""
          : answer,
      textFeedback, // Send text feedback separately
    };

    fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => setSubmitted(true))
      .catch((err) => console.error("Error submitting feedback:", err));
  };

  return (
    <div style={styles.container}>
      {submitted ? (
        <p style={styles.heading}>Thank you for your feedback! 🎉</p>
      ) : question ? (
        <div>
          <h3 style={styles.heading}>{question.text}</h3>

          {question.type === "yes_no" && (
            <div style={styles.optionContainer}>
              <label>
                <input
                  type="radio"
                  name="yes_no"
                  value="Yes"
                  onChange={(e) => setAnswer(e.target.value)}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="yes_no"
                  value="No"
                  onChange={(e) => setAnswer(e.target.value)}
                />{" "}
                No
              </label>
            </div>
          )}

          {question.type === "rating" && (
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    ...styles.star,
                    ...(selectedRating >= star ? styles.selectedStar : {}),
                  }}
                  onClick={() => setSelectedRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          )}

          {question.type === "multiple" && (
            <div style={styles.checkboxContainer}>
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOptions([...selectedOptions, option]);
                      } else {
                        setSelectedOptions(
                          selectedOptions.filter((opt) => opt !== option)
                        );
                      }
                    }}
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
          )}

          {question.type === "single" && (
            <div style={styles.optionContainer}>
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="single"
                    value={option}
                    onChange={() => setSelectedOptions([option])}
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
          )}

          {/* Text Feedback Box */}
          <textarea
            placeholder="Your feedback (optional)"
            value={textFeedback} // Use textFeedback state
            onChange={(e) => setTextFeedback(e.target.value)}
            style={styles.input}
          />

          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <p style={styles.heading}>Loading question...</p>
      )}
    </div>
  );
};

export default FeedbackWidget;
