import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [questions, setQuestions] = useState([]);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const response = await fetch("http://localhost:5000/api/questions", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setQuestions(data);
    };

    const handleDeleteQuestion = async (id) => {
        const response = await fetch(`http://localhost:5000/api/questions/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            fetchQuestions();
        } else {
            alert("Failed to delete question!");
        }
    };

    const handleEditQuestion = (question) => {
        navigate("/question", { state: { question } });
    };

    const handleAddQuestion = () => {
        navigate("/question");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.adminName}>Admin: {username}</h2>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </div>

            {/* Admin Dashboard Title */}
            <h2 style={styles.title}>Admin Dashboard</h2>

            {/* Add New Question Prompt */}
            <div style={styles.addButtonContainer}>
                <button onClick={handleAddQuestion} style={styles.addButton}>
                    ➕ Add New Question
                </button>
            </div>

            {/* Questions Table */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr style={{display:'flex' , width:'100%'}}>
                            <th style={{ ...styles.rowData, width: "10%" , padding:'10px 5px' }}>Sr No</th>
                            <th style={{ ...styles.rowData, width: "30%" , padding:'10px 5px' }}>Question</th>
                            <th style={{ ...styles.rowData, width: "15%" , padding:'10px 5px' }}>Question Type</th>
                            <th style={{ ...styles.rowData, width: "10%" , padding:'10px 5px' }}>State</th>
                            <th style={{ ...styles.rowData, width: "35%" , padding:'10px 5px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q, index) => (
                            <tr key={q._id} style={{display:'flex' , width:'100%' , borderTop:'2px solid black' , borderBottom:'2px solid black'}}>
                                <td style={{ ...styles.rowData, width: "10%" , padding:'10px 5px' }}>{index + 1}</td>
                                <td style={{ ...styles.rowData, width: "30%" , padding:'10px 5px' }}>{q.text}</td>
                                <td style={{ ...styles.rowData, width: "15%" , padding:'10px 5px' }}>{q.type}</td>
                                <td style={{ ...styles.rowData, width: "10%" , padding:'10px 5px' }}>
                                    <span style={q.isPublished ? styles.published : styles.unpublished}>
                                        {q.isPublished ? "Published" : "Unpublished"}
                                    </span>
                                </td>
                                <td style={{ ...styles.rowData, width: "35%" }}>
                                    <button onClick={() => handleEditQuestion(q)} style={styles.editButton}>✏️ Edit</button>
                                    <button onClick={() => handleDeleteQuestion(q._id)} style={styles.deleteButton}>❌ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: "20px",
        width: '100%',
        background: "#f4f4f4",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#4A90E2",
        color: "#fff",
        padding: "15px 20px",
        borderRadius: "5px",
        marginBottom: "20px",
    },
    adminName: {
        margin: 0,
    },
    logoutButton: {
        background: "#ff4d4d",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    addButtonContainer: {
        textAlign: "center",
        marginBottom: "15px",
    },
    addButton: {
        background: "#4CAF50",
        color: "#fff",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
    },
    tableContainer: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        background: "#fff",
        borderCollapse: "collapse",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
    },
    rowData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    published: {
        color: "#4CAF50",
        fontWeight: "bold",
    },
    unpublished: {
        color: "#ff4d4d",
        fontWeight: "bold",
    },
    editButton: {
        background: "#FFC107",
        color: "#fff",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "5px",
        transition: "0.3s",
    },
    deleteButton: {
        background: "#ff4d4d",
        color: "#fff",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
    },
};

export default Admin;
