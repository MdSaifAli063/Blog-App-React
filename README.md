<div align="center">

# 📝 MyBlog — Modern Full-Stack Blog App  
### Built with ❤️ React + Appwrite + Tailwind CSS

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />

</div>

---
## 🌟 Overview

**MyBlog** is a modern, fully responsive blogging platform built using **React**, **Appwrite**, and **Tailwind CSS**.  
Users can create, edit, and delete their own posts with secure authentication powered by Appwrite.  

✨ Clean design, 🌈 soft gradients, and 🔒 authentication make it a perfect personal blog project.

---
## 🚀 Features

- 🧑‍💻 **User Authentication** (Signup, Login, Logout)  
- 📰 **Create, Edit, Delete, and View Posts**  
- 🖼️ **Upload Featured Images** for posts  
- 🌐 **Dynamic Routing** using React Router  
- 💅 **Modern UI with Tailwind CSS**  
- 🧭 **Protected Routes** for logged-in users  
- 🔄 **Auto-login state handling** with Redux  
- 📱 **Fully Responsive** and mobile-friendly  

---
## 🧩 Tech Stack

| Category | Technologies |
|-----------|---------------|
| Frontend | ⚛️ React, 🌀 Vite, 🧭 React Router, 🧱 Redux |
| Backend | 🧰 Appwrite (Database, Auth, File Storage) |
| Styling | 🎨 Tailwind CSS |
| Tools | 🧑‍💻 VS Code, 🌍 GitHub, 🚀 Netlify / Vercel |

---
## 🛠️ Installation

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/myblog.git
cd myblog
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Set up Appwrite

- Create a Project in Appwrite Cloud

Set up:

- Database with a posts collection
- Storage bucket for featured images
- Add API endpoint and project ID in a config file:
```js
export default {
  appwriteUrl: "https://cloud.appwrite.io/v1",
  appwriteProjectId: "your_project_id",
  appwriteDatabaseId: "your_database_id",
  appwriteCollectionId: "your_collection_id",
  appwriteBucketId: "your_bucket_id",
}
```
### 4️⃣ Run the development server
```bash
npm run dev
```
> App runs locally at http://localhost:5173

## 📸 Screenshots
| Home Page                                                   | Create Post                                                     | View Post                                                   |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| ![Home](https://via.placeholder.com/300x160?text=Home+Page) | ![Create](https://via.placeholder.com/300x160?text=Create+Post) | ![View](https://via.placeholder.com/300x160?text=View+Post) |

## 🧠 Folder Structure
