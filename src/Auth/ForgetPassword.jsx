import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api/apiUrl";

function ForgetPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/user/user-forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success) {

        toast.success(res.data.message || "OTP sent to email");

        localStorage.setItem("reset-email", email);

        // OTP page
        navigate("/VerifyOtp");

      }

    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded p-8 border border-gray-100">

        <div className="text-center mb-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Forgot Password
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Enter your email to receive OTP
          </p>

        </div>

        <form onSubmit={handleForgetPassword} className="space-y-6">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >

            {loading ? "Sending OTP..." : "Send OTP"}

          </button>

        </form>

        <div className="mt-6 text-center">

          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 text-sm hover:underline"
          >
            Back to Login
          </button>

        </div>

      </div>

    </div>

  );
}

export default ForgetPassword;