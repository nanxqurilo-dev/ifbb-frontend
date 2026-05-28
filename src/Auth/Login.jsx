// src/Auth/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "../api/apiUrl";
import { useAuth } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/user/user-log-in`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      login(res.data.token);
      localStorage.setItem("user-email", email);

      if (res.data.user) {
        localStorage.setItem("user-data", JSON.stringify(res.data.user));
      }

      toast.success(res.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT IMAGE SECTION - Full Height IFBB Bodybuilder Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534367507877-0edd93bd013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80&blur=0"
          alt="IFBB Professional Bodybuilder"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/70 to-transparent">
          <div className="h-full flex flex-col justify-center p-12">
            <div className="max-w-lg">
              <div className="flex items-center mb-8">
                <div className="bg-blue-500 w-3 h-10 rounded-full mr-3"></div>
                <h1 className="text-white text-5xl font-bold">
                  IFBB <span className="text-blue-400">Academy</span>
                </h1>
              </div>
              
              <h2 className="text-white text-4xl font-bold mb-6 leading-tight">
                WELCOME TO <span className="text-blue-400">IFBB ELITE</span>
              </h2>
              <p className="text-blue-100 text-xl mb-8">
                Join the world's premier bodybuilding federation. Train like a champion.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 w-2 h-2 rounded-full mr-3"></div>
                  <span className="text-white text-lg">Professional Competition Tracking</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 w-2 h-2 rounded-full mr-3"></div>
                  <span className="text-white text-lg">IFBB Certified Training Programs</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 w-2 h-2 rounded-full mr-3"></div>
                  <span className="text-white text-lg">Judging Criteria & Standards</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 w-2 h-2 rounded-full mr-3"></div>
                  <span className="text-white text-lg">Global Athlete Network</span>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-blue-700/50">
                <p className="text-blue-200 italic">
                  "The IFBB stands for excellence in physique sports worldwide."
                </p>
                <p className="text-blue-300 text-sm mt-2">- IFBB President</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-12 flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <p className="text-blue-200 text-sm">International Federation of Bodybuilding</p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 w-2 h-8 rounded-full mr-3"></div>
              <h1 className="text-3xl font-bold text-gray-800">
                IFBB <span className="text-blue-600">Academy</span>
              </h1>
            </div>
            <p className="text-gray-600">International Federation of Bodybuilding</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded p-8 border border-gray-100">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                IFBB Member Login
              </h2>
              {/* <p className="text-gray-600">
                Access your athlete dashboard and competition portal
              </p> */}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="athlete@ifbb.com"
                    className="w-full border border-gray-300 pl-10 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                 Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 pl-10 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                    Remember this device
                  </label>
                </div>
                <button
                  type="button"
                  onClick={()=> navigate("/ForgetPassword")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </span>
                )}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New to IFBB?</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate("/Signup")}
                className="mt-6 w-full border-2 border-blue-600 text-blue-600 py-3 rounded font-bold hover:bg-blue-50 transition-all duration-300"
              >
                Register
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} International Federation of Bodybuilding & Fitness. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Official IFBB Professional League Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;