import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    <div className="font-[sans-serif] text-[#333] mt-4 p-4 relative">
      <Navbar />
      <div className="max-w-md w-full mx-auto relative z-50">
      
        <div className="border border-gray-300 bg-white rounded-md p-8">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold">Create an account</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-sm mb-2 block" htmlFor="name">
                  Name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block" htmlFor="email">
                  Email Id
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block" htmlFor="password">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              </div>
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
                  I accept the{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-sm mt-6 text-center">
              Already have an account?{' '}
              <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
