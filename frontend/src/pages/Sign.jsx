import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Sign = () => {
    const [username, setUsername] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [gender, setGender] = useState();

    const handleGenderChange = (e) => {
      setGender(e.target.value);
    };
    
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/auth/signup", {username, fullName, password, confirmPassword, gender})
        .then(res => {
          console.log(res);
          navigate("/login");
        })
        .catch(err => console.log(err))
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="max-w-md w-full bg-gray-900 shadow-lg rounded-lg p-6">
        <div>
          <h2 className="text-2xl text-white font-semibold mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div>
              <label htmlFor="username" className="block">Username:</label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label htmlFor="email" className="block">Full Name:</label>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="block">Password:</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="block">Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block mb-2">Gender:</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                  className="mr-2 focus:ring-indigo-200"
                />
                <label htmlFor="male" className="mr-4">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                  className="mr-2 focus:ring-indigo-200"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Signin
            </button>
          </form>
          <Link to={"/login"} className="block text-center">
            <button className="w-full mt-5 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-200">
              Do you have an account?
            </button>
          </Link>
        </div>
      </div>  
    </div>
  )
}

export default Sign