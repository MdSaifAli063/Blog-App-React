import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const session = await authService.createAccount(data)
      if (!session) throw new Error("Account creation failed")

      const user = await authService.getCurrentUser()
      if (!user) throw new Error("Failed to fetch user after login")

      dispatch(login({ userData: user }))
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-blue-300 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo width="90px" />
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
          Create Your Account ✨
        </h2>
        <p className="text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline transition duration-200"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 mt-6 text-center font-medium">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
          <Input
            {...register("name", { required: true })}
            label="Full Name"
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <Input
            {...register("email", { required: true })}
            label="Email"
            placeholder="you@example.com"
            type="email"
            className="w-full px-4 py-2 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <Input
            {...register("password", { required: true })}
            label="Password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <Button
            type="submit"
            className="w-full py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup