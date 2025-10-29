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
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus }
  ]

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
                    className="px-5 py-2 text-gray-700 font-medium rounded-full transition-all duration-300 bg-white/80 hover:bg-indigo-100 hover:text-indigo-700 shadow-sm border border-gray-300"
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