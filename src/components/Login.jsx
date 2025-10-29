import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import Button from "./Button"
import Input from './Input'
import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login as authLogin } from "../store/authSlice"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-blue-300 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo width="90px" />
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-base text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:underline transition duration-200"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 mt-6 text-center font-medium">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login