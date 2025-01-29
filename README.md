# AI ChatBot Project

## Overview
This project is an AI-powered chatbot built using **React (Vite)** for the frontend and **Spring Boot** for the backend. The chatbot leverages the **Gemini Flash API** for natural language processing and AI capabilities. The backend is deployed using **Docker** and hosted on **Render**, while the frontend is deployed on **Netlify**.

## Features
- **Frontend**: A responsive and interactive user interface built with React (Vite).
- **Backend**: A robust Spring Boot application to handle API requests and integrate with the Gemini Flash API.
- **AI Integration**: Utilizes the Gemini Flash API for intelligent chatbot responses.
- **Deployment**: Backend deployed on Render using Docker, and frontend deployed on Netlify.

## Technologies Used
- **Frontend**: React (Vite), HTML, CSS, JavaScript
- **Backend**: Spring Boot, Java
- **AI**: Gemini Flash API
- **Deployment**: Docker, Render (Backend), Netlify (Frontend)


---

## Setup Instructions

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit [http://localhost:5173](http://localhost:5173).

---

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Build the Spring Boot application:
   ```bash
   mvn clean package
   ```
3. Run the application:
   ```bash
   java -jar target/chatbot-0.0.1-SNAPSHOT.jar
   ```
4. The backend will be available at [http://localhost:8080](http://localhost:8080).

---

### Docker Setup
1. Build the Docker image:
   ```bash
   docker build -t your-spring-boot-app .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 8080:8080 your-spring-boot-app
   ```

---
### Prerequisites
- **Node.js** (for frontend)
- **Java JDK 17** (for backend)
- **Docker** (for containerization)
- **Gemini Flash API Key** (for AI integration)

# Deployment Guide

## Backend Deployment (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the **Root Directory** to `backend`.
5. Configure the environment variables in Render:
   - `GEMINI_API_KEY`: Your Gemini Flash API key.
6. Deploy the app.

---

## Frontend Deployment (Netlify)
1. Push your code to GitHub.
2. Go to [Netlify](https://www.netlify.com/) and create a new site.
3. Connect your GitHub repository.
4. Set the **Build Command** to:
   ```sh
   npm run build
   ```
5. Set the **Publish Directory** to `build`.
6. Add the environment variable:
   - `VITE_API_BASE_URL`: The URL of your deployed backend (e.g., `https://your-spring-boot-app.onrender.com`).
7. Deploy the app.

---

## API Endpoints

### Backend (Spring Boot)
#### **POST /api/chat**: Send a message to the chatbot.

**Request Body:**
```json
{
  "message": "Hello, how are you?"
}
```

---


## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/YourFeature
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- **Gemini Flash API** for providing AI capabilities.
- **Render** and **Netlify** for hosting services.
- **React** and **Spring Boot** communities for their amazing frameworks.

---

## Contact
For any questions or feedback, feel free to reach out:
- **Name:** Neeraj  
- **Email:** neerajsaini3071@gmail.com
- **GitHub:** [neeraj3071](https://github.com/neeraj3071)  
