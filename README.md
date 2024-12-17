# 📬 Group Chat Application

**Group Chat Application** is a full-stack project that enables real-time communication among multiple users. It uses modern tools and frameworks to deliver seamless, responsive, and secure chat functionality.

## 🚀 Live Demo
Check out the live demo of the project here: [Live Demo](https://group-chat-realtime.netlify.app/)

---

## 🚀 Features

- **Real-time Messaging**: Instant message updates using Socket.IO.  
- **Chat Rooms**: Users can create and join different chat rooms.  
- **Responsive UI**: Built with React and Tailwind CSS for a clean and adaptive interface.  
- **Backend API**: RESTful APIs built using Spring Boot.  
- **Database**: Messages and user data stored using MongoDB.  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Tailwind CSS  
- Socket.IO Client  

### **Backend**
- Spring Boot (Java)  
- Socket.IO  
- MongoDB  

---

## 🗂️ Project Structure

```plaintext
group-chat/
|-- backend/                 # Spring Boot Backend
|   |-- src/
|   |   |-- main/
|   |       |-- java/
|   |           |-- com/groupchat/      # Main application package
|   |               |-- controllers/    # API controllers
|   |               |-- models/         # MongoDB schemas
|   |               |-- services/       # Business logic
|   |               |-- repositories/   # MongoDB repositories
|   |               |-- GroupChatApplication.java # Main Spring Boot app
|   |-- pom.xml                # Maven dependencies
|-- frontend/                # React.js Frontend
|   |-- src/
|   |   |-- components/      # React components
|   |   |-- App.js           # Main React component
|-- README.md                # Documentation

```

## ⚙️ Setup and Installation
**Prerequisites**
Make sure you have the following installed on your machine:

- Node.js (v14+ recommended)
- MongoDB (local or Atlas cloud instance)
- Java JDK 17+
- Maven

## Backend Setup

 ** Clone the repository:  **
```bash
git clone https://github.com/suresh-tech007/room-chat-full-stack.get
cd group-chat/backend
```
 ** Configure MongoDB in the application.properties file:
```bash
spring.data.mongodb.uri=mongodb://localhost:27017/groupchat
jwt.secret=your_jwt_secret
server.port=8080
```

** Build the project using Maven: **

```bash
Copy code
mvn clean install
```
**Run the backend server:**

```bash
mvn spring-boot:run
```
***Backend runs on http://localhost:8080.

##Frontend Setup
 ** Go to the frontend directory: **

```bash
cd ../frontend
```

** Install frontend dependencies: **

```bash
npm install

```
** Start the frontend development server: **

```bash
npm run dev
```
**Frontend runs on http://localhost:5173. **

## 🔗 API Endpoints
Chat Functionality
POST /api/rooms/create -Enter the room with password
POST /api/rooms/login - Create a new chat room and Enter with password
POST /api/messages/{roomId} - Send a message to a specific room
GET /api/messages/{roomId} - Retrieve all messages for a room



 
