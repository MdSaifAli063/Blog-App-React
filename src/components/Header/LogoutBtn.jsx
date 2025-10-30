import React from 'react'
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth.js"
import { logout } from "../../store/authSlice.js"

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition duration-300 shadow-md"
    >
      Logout
    </button>
  )
}

export default LogoutBtn