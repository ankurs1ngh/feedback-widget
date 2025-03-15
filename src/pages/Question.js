import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
  },
  optionsContainer: {
    marginTop: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "white",
  },
  saveButtonHover: {
    backgroundColor: "#218838",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "white",
  },
  cancelButtonHover: {
    backgroundColor: "#c82333",
  },
  radioContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  radioLabel: {
    fontSize: "16px",
    color: "#333",
    marginLeft: "5px",
  },
};

const QuestionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Check if editing an existing question
  const existingQuestion = location.state?.question || null;

  const [text, setText] = useState(existingQuestion ? existingQuestion.text : "");
  const [type, setType] = useState(existingQuestion ? existingQuestion.type : "yes_no");
  const [options, setOptions] = useState(existingQuestion?.options || []);
  const [published, setPublished] = useState(existingQuestion ? existingQuestion.published : false);

  useEffect(() => {
    if (type !== "multiple" && type !== "single_choice") {
      setOptions([]);
    }
  }, [type]);

  const handleSave = async () => {
    if (!text) {
      alert("Question cannot be empty!");
      return;
    }

    const payload = { text, type, options, published };

    const url = existingQuestion
      ? `http://localhost:5000/api/questions/${existingQuestion._id}`
      : "http://localhost:5000/api/questions";

    const method = existingQuestion ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      navigate("/admin");
    } else {
      alert("Failed to save question!");
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{existingQuestion ? "Edit Question" : "Add New Question"}</h2>

      {/* Question Input */}
      <input
        type="text"
        placeholder="Enter question text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        style={styles.input}
      />

      {/* Question Type Selection */}
      <select value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
        <option value="yes_no">Yes/No</option>
        <option value="rating">Rating Scale (1-5)</option>
        <option value="multiple">Multiple Choice</option>
        <option value="single_choice">Single Choice</option>
      </select>

      {/* Options Input (for Multiple/Single Choice) */}
      {(type === "multiple" || type === "single_choice") && (
        <div style={styles.optionsContainer}>
          <h4>Options:</h4>
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={styles.input}
            />
          ))}
          <button
            onClick={handleAddOption}
            style={{ ...styles.button, backgroundColor: "#007bff", color: "white" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            ➕ Add Option
          </button>
        </div>
      )}

      {/* Publish/Unpublish Radio Buttons */}
      <div style={styles.radioContainer}>
        <label>
          <input
            type="radio"
            name="publishStatus"
            value="true"
            checked={published === true}
            onChange={() => setPublished(true)}
          />
          <span style={styles.radioLabel}>Publish</span>
        </label>

        <label>
          <input
            type="radio"
            name="publishStatus"
            value="false"
            checked={published === false}
            onChange={() => setPublished(false)}
          />
          <span style={styles.radioLabel}>Unpublish</span>
        </label>
      </div>

      {/* Save & Cancel Buttons */}
      <button
        onClick={handleSave}
        style={{ ...styles.button, ...styles.saveButton }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.saveButton.backgroundColor)}
      >
        💾 Save
      </button>
      <button
        onClick={() => navigate("/admin")}
        style={{ ...styles.button, ...styles.cancelButton }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.cancelButton.backgroundColor)}
      >
        ❌ Cancel
      </button>
    </div>
  );
};

export default QuestionForm;
