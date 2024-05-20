import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    axios.defaults.withCredentials = true;
    axios.post("http://localhost:4000/auth/login", { username, password })
      .then(res => {
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err);
        setError("Login failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="max-w-md w-full bg-gray-900 shadow-lg rounded-lg p-6">
        <h2 className="text-lg text-white font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col text-white">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex flex-col text-white">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Link to="/signin">
          <button className="w-full bg-gray-400 mt-5 text-white py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-200">
            Don't have an account? Sign up now.
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
