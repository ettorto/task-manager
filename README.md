# task-manager
Created with CodeSandbox

# 📝 Task Manager App

A modern and responsive task management web application built with **React**, **Firebase**, and **Tailwind CSS**. It allows users to register, log in, and manage their daily tasks in an intuitive interface.

🚀 **Live Demo**: [https://task-manager-olive-nine.vercel.app/](https://task-manager-olive-nine.vercel.app/)

---

## ✨ Features

- 🔐 User Authentication (Sign Up, Login, Logout)
- ✅ Create, Update, and Delete Tasks
- ☁️ Real-time data synchronization with Firebase Firestore
- 💅 Stylish and responsive UI using Tailwind CSS
- 🔒 Route protection for authenticated users only

---

## 📸 Screenshots

| Login Page | Dashboard |
|------------|-----------|
| ![Login](https://i.imgur.com/your-login-image.png) | ![Dashboard](https://i.imgur.com/your-dashboard-image.png) |



---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore Database
- **Hosting**: Vercel

---

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager

2. **npm install**

3. **Set up Firebase**

```Create a Firebase project at https://console.firebase.google.com

```Enable Authentication (Email/Password) and Firestore

```Create a firebase.js file and configure it:

```import { initializeApp } from "firebase/app";
```import { getAuth } from "firebase/auth";
```import { getFirestore } from "firebase/firestore";

```const firebaseConfig = {
  ```apiKey: "YOUR_API_KEY",
  ```authDomain: "YOUR_AUTH_DOMAIN",
  ```projectId: "YOUR_PROJECT_ID",
 ``` storageBucket: "YOUR_STORAGE_BUCKET",
  ```messagingSenderId: "YOUR_SENDER_ID",
  ```appId: "YOUR_APP_ID",
```};

```const app = initializeApp(firebaseConfig);

```export const auth = getAuth(app);
```export const db = getFirestore(app);


```npm run dev

## Project Structure
src/
├── components/
│   ├── Login.js
│   ├── Signup.js
│   └── Dashboard.js
├── firebase.js
├── App.js
├── index.js
└── styles.css

## Todo / Future Improvements
Add task due dates and reminders

Task priority labels (e.g., High, Medium, Low)

Drag-and-drop reordering

Dark mode toggle

🧑‍💻 Author
Developed by [Ernest Torto]. Feel free to reach out or contribute to the project!
