import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

function Signup() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    await authService.register({ name, email, password, role });
    console.log("Signup as:", role, { name, email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Account
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Sign up to get started
        </p>

        <form onSubmit={handleSignup} className="mt-6 flex flex-col space-y-5">
          {/* Role Selection */}
          <div className="flex justify-around mb-3">
            <label
              className={`px-4 py-2 rounded-lg cursor-pointer border inline-flex items-center justify-center transition-colors ${
                role === "client"
                  ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                  : "border-gray-300 text-gray-600 hover:bg-indigo-100 hover:border-indigo-500 hover:text-indigo-700"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={(e) => setRole(e.target.value)}
                className="sr-only"
              />
              Client
            </label>

            <label
              className={`px-4 py-2 rounded-lg cursor-pointer border inline-flex items-center justify-center transition-colors ${
                role === "counselor"
                  ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                  : "border-gray-300 text-gray-600 hover:bg-indigo-100 hover:border-indigo-500 hover:text-indigo-700"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="counselor"
                checked={role === "counselor"}
                onChange={(e) => setRole(e.target.value)}
                className="sr-only"
              />
              Counselor
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold transition-colors hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
