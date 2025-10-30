import React from 'react'
import { Link } from "react-router-dom"
import Logo from "../Logo"

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-200/70 via-cyan-100/70 to-indigo-200/70 backdrop-blur-md border-t border-blue-300 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -m-6">
          {/* Logo & Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-700">
                &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="text-xs font-semibold uppercase text-gray-600 mb-4 tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Features</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Pricing</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Affiliate</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="text-xs font-semibold uppercase text-gray-600 mb-4 tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Account</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Help</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Contact</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="text-xs font-semibold uppercase text-gray-600 mb-4 tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Terms & Conditions</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer