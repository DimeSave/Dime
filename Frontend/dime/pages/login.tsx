import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, e.g., API calls, validation checks, etc.
    console.log('Form data:', formData);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md w-full mx-auto relative z-50">
        <form onSubmit={handleSubmit}>
          <div className="mb-12">
            <h3 className="text-3xl font-extrabold">Sign in</h3>
            <p className="text-sm mt-4">
              Don't have an account{' '}
              <Link href="/Signup">
                <a className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a>
              </Link>
            </p>
          </div>
          <div>
            <label className="text-xs block mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="mt-8">
            <label className="text-xs block mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-5">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
