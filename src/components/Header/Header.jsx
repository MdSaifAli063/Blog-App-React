import React from 'react'
import Container from "../container/Container"
import Logo from "../Logo"
import { Link, useNavigate } from "react-router-dom"
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", slug: "/", active: true, color: "gray" },
    { name: "Login", slug: "/login", active: !authStatus, color: "blue" },
    { name: "Signup", slug: "/signup", active: !authStatus, color: "green" },
    { name: "All Posts", slug: "/all-posts", active: authStatus, color: "gray" },
    { name: "Add Post", slug: "/add-post", active: authStatus, color: "gray" }
  ]

  const getButtonClasses = (color) => {
    const base = "px-5 py-2 font-medium rounded-full transition-all duration-300 shadow-sm border"
    const themes = {
      blue: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
      green: "bg-green-600 text-white hover:bg-green-700 border-green-600",
      gray: "bg-white/80 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 border-gray-300"
    }
    return `${base} ${themes[color] || themes.gray}`
  }

  return (
    <header className="bg-gradient-to-r from-blue-200/70 via-cyan-100/70 to-indigo-200/70 backdrop-blur-md shadow-md border-b border-blue-300 h-16">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo only */}
          <Link to="/" className="flex items-center h-full">
            <div className="h-full flex items-center">
              <Logo width="180px" style={{ maxHeight: "45px" }} />
            </div>
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={getButtonClasses(item.color)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header