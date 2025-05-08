# 📝 MyNotebook App

MyNotebook is a full-stack note-taking application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to create folders and take notes, with each user having a private space for managing and editing their notes securely.

## 🚀 Features

- 🔐 User authentication (Sign Up / Login)
- 📁 Folder-based organization of notes
- 📝 Create, edit, and delete notes
- 🔒 Each user has their own private notes
- 📂 VS Code-like interface with a sidebar and editor panel
- 💾 Data persistence with MongoDB

## 🛠️ Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Other Tools**: Vite, CORS, dotenv

## 📸 Screenshots

_Add screenshots here if available_

## 📂 Folder Structure
my-notebook-app/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Sidebar, Editor, Auth, etc.
│ │ ├── pages/ # Auth Pages, Home Page
│ │ ├── App.js
│ │ └── main.jsx
│
├── server/ # Express backend
│ ├── routes/ # Folder, Notes, Auth routes
│ ├── models/ # Mongoose models
│ ├── controllers/ # Business logic
│ ├── server.js # Entry point

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/my-notebook-app.git
   cd my-notebook-app

2. ** Start the backend

bash
Copy
Edit
cd backend
npm install
npm run server

3. ** Start the frontend
   ```bash
   cd frontend
   npm install
   npm run dev

   
🔐 Authentication Flow
JWT is used to manage secure login and session tokens.

Protected routes ensure that users only access their own data.

📌 Future Improvements
Add search and filtering for notes

Enable note sharing or collaboration

Markdown support in the note editor

Dark/light theme toggle

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is open-source and available under the MIT License.
