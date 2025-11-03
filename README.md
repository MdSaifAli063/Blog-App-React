# 📝 Blog App React

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-21.2.1-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.1-764ABC?style=for-the-badge&logo=redux&logoColor=white)

**A modern, full-featured blogging platform built with React and Appwrite**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Configuration](#-configuration) • [Usage](#-usage) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

### 🔐 Authentication
- **User Registration & Login** - Secure authentication using Appwrite
- **Session Management** - Persistent user sessions with Redux
- **Protected Routes** - Route guards for authenticated pages

### 📄 Blog Management
- **Create Posts** - Rich text editor (TinyMCE) for writing blog posts
- **Edit Posts** - Update your posts anytime
- **Delete Posts** - Remove posts with confirmation
- **Image Upload** - Featured images for posts
- **Post Status** - Active/Inactive post management

### 🎨 User Interface
- **Modern Design** - Beautiful gradient backgrounds and glassmorphism effects
- **Responsive Layout** - Works seamlessly on all devices
- **Real-time Updates** - Instant UI updates after operations
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages

### 📱 Pages & Views
- **Home Page** - Welcome page with featured posts
- **All Posts** - Browse all published posts in a grid layout
- **Post Details** - Individual post view with full content
- **Add/Edit Post** - Intuitive forms for content creation
- **User Dashboard** - Manage your own posts

---

## 📸 Screenshots
| Home Page                                                   | Create Post                                                     | View Post                                                   |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| ![Home](https://via.placeholder.com/300x160?text=Home+Page) | ![Create](https://via.placeholder.com/300x160?text=Create+Post) | ![View](https://via.placeholder.com/300x160?text=View+Post) |


## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| ⚛️ **React** | 19.1.1 | UI Library |
| ⚡ **Vite** | 7.1.7 | Build Tool & Dev Server |
| 🎨 **Tailwind CSS** | 3.4.18 | Styling Framework |
| 🧭 **React Router** | 7.9.4 | Client-side Routing |
| 🏪 **Redux Toolkit** | 2.9.1 | State Management |
| 📝 **React Hook Form** | 7.65.0 | Form Handling |
| ✏️ **TinyMCE** | 6.3.0 | Rich Text Editor |
| 🔍 **html-react-parser** | 5.2.7 | HTML Content Parsing |

### Backend & Services
| Service | Version | Purpose |
|---------|---------|---------|
| ☁️ **Appwrite** | 21.2.1 | Backend as a Service (Auth, Database, Storage) |

---

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd Blog-App-React
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory with your Appwrite credentials:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

### Step 4: Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

---

## ⚙️ Configuration

### Appwrite Setup

1. **Create an Appwrite Project**
   - Go to [Appwrite Cloud](https://cloud.appwrite.io) or use self-hosted
   - Create a new project
   - Copy your Project ID

2. **Database Setup**
   - Create a Database
   - Create a Collection with the following attributes:
     - `title` (String, required)
     - `slug` (String, required, unique)
     - `content` (String, required)
     - `featuredimage` (String, optional)
     - `status` (String, required) - Values: "active" or "inactive"
     - `userid` (String, required)
   - Set collection permissions (read/write for authenticated users)

3. **Storage Setup**
   - Create a Storage Bucket
   - Set bucket permissions (read/write for authenticated users)
   - Configure file size limits and allowed file types

4. **Authentication Setup**
   - Enable Email/Password authentication
   - Configure email templates (optional)

---

## 📖 Usage

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Creating Your First Post

1. **Register/Login** - Create an account or login
2. **Navigate to Add Post** - Click "Add Post" in the header
3. **Fill in Details**:
   - Enter post title
   - Slug will auto-generate (or customize it)
   - Write content using the rich text editor
   - Upload a featured image (optional)
   - Select post status (Active/Inactive)
4. **Submit** - Click "Submit" to publish

### Managing Posts

- **View All Posts** - Browse all published posts on the "All Posts" page
- **Edit Post** - Click "Edit" button on your own posts
- **Delete Post** - Click "Delete" button on your own posts (with confirmation)

---

## 📁 Project Structure

```
Blog-App-React/
├── public/                 # Static assets
├── src/
│   ├── appwrite/          # Appwrite service configuration
│   │   ├── auth.js        # Authentication service
│   │   └── config.js      # Database & Storage service
│   ├── components/        # Reusable React components
│   │   ├── post-form/     # Post creation/editing form
│   │   ├── Header/        # Navigation header
│   │   ├── footer/        # Footer component
│   │   └── ...            # Other components
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Home page
│   │   ├── AllPosts.jsx   # All posts listing
│   │   ├── Post.jsx       # Individual post view
│   │   ├── AddPost.jsx    # Create new post
│   │   ├── EditPost.jsx   # Edit existing post
│   │   ├── Login.jsx      # Login page
│   │   └── Signup.jsx     # Registration page
│   ├── store/             # Redux store configuration
│   │   ├── authSlice.js   # Authentication state
│   │   └── store.js       # Store setup
│   ├── conf/              # Configuration files
│   │   └── conf.js        # Environment variables
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables (create this)
├── package.json           # Dependencies & scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

---

## 🎯 Key Features Explained

### 🔒 Protected Routes
Routes are protected using the `AuthLayout` component, ensuring only authenticated users can access certain pages.

### 📝 Rich Text Editor
TinyMCE provides a powerful WYSIWYG editor for creating formatted blog posts with images, links, and styling.

### 🖼️ Image Handling
- Image upload to Appwrite Storage
- Automatic image preview generation
- Image deletion when posts are deleted
- Support for multiple image formats

### 🏪 State Management
Redux Toolkit manages:
- User authentication state
- Session persistence
- Global app state

---

## 🐛 Troubleshooting

### Images Not Displaying
- Check Appwrite Storage bucket permissions
- Verify file IDs are correctly stored in database
- Ensure bucket is configured for public read access

### Authentication Issues
- Verify Appwrite project credentials in `.env`
- Check that authentication is enabled in Appwrite console
- Clear browser cookies/localStorage if sessions persist incorrectly

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version compatibility

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Md Saif Ali**

- GitHub: [@yourusername](https://github.com/MdSaifAli063)

---

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io) for the amazing backend platform
- [React](https://react.dev) team for the incredible framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [TinyMCE](https://www.tiny.cloud) for the rich text editor

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

Made with ❤️ using React and Appwrite

</div>
