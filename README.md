# Dynamic Feedback Widget

## Overview
The **Dynamic Feedback Widget** is an embeddable feedback system that allows users to provide responses to dynamically loaded questions. The questions are managed via an admin dashboard and stored in a MongoDB database. The system supports multiple question types including:
- Yes/No
- Rating Scale (1-5 stars)
- Multiple Choice
- Single Choice
- Text Feedback

User responses are stored in the database with timestamps and references to the respective questions.

## Features
- **Floating Feedback Button**: Users can open a popup widget to submit feedback.
- **Dynamic Question Loading**: Fetches published questions from the backend.
- **Multiple Answer Types**: Supports various feedback formats.
- **Admin Dashboard**: Allows managing, publishing, and unpublishing questions.
- **Embeddable via `<script>` Tag**: Easily integrate the widget on any webpage.

## Tech Stack
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

---

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **MongoDB** (Local or Cloud-based like MongoDB Atlas)

### Steps to Run the Project
#### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/dynamic-feedback-widget.git
cd dynamic-feedback-widget
```

#### 2. Install Dependencies
```sh
npm install
```

#### 3. Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/feedbackdb
```
*(Update `MONGO_URI` if using MongoDB Atlas)*

#### 4. Start the Server
```sh
npm start
```
The backend will start at `http://localhost:5000`

#### 5. Start the Frontend
```sh
cd client
npm install
npm start
```
The frontend will start at `http://localhost:3000`

---

## API Endpoints
### 1. Question Endpoints
- `GET /api/questions/published` - Fetch all published questions
- `POST /api/questions` - Create a new question (Admin only)
- `PUT /api/questions/:id` - Update a question (Admin only)
- `DELETE /api/questions/:id` - Soft delete a question

### 2. Feedback Endpoints
- `POST /api/feedback`
  - **Request Body:**
    ```json
    {
      "questionId": "string",
      "answer": "string | array | number",
      "feedbackText": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Feedback submitted successfully"
    }
    ```

---

## Embedding the Widget
To use the widget on any external site, include the following script in your HTML:
```html
<script src="http://localhost:5000/widget.js" defer></script>
```
This will display a floating feedback button on the page.

---

## Future Enhancements
- User authentication for feedback tracking
- More customization options for the widget
- Dashboard analytics for submitted feedback

---

## Contributing
Feel free to submit issues and pull requests! Follow the standard Git workflow:
1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to your fork and submit a PR

---

## License
MIT License. See `LICENSE` for details.

