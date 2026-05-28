import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api/apiUrl";

function VerifyOtp() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // get email from localStorage
  useEffect(() => {

    const savedEmail = localStorage.getItem("reset-email");

    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      navigate("/ForgetPassword");
    }

  }, [navigate]);



  const handleChangePassword = async (e) => {

    e.preventDefault();

    if (!otp || !password) {
      toast.error("OTP and New Password are required");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/user/user/change-password`,
        {
          email: email,
          otp: otp,
          new_password: password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success) {

        toast.success(res.data.message || "Password updated successfully");

        localStorage.removeItem("reset-email");

        navigate("/login");

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
            Verify OTP
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Enter the OTP sent to your email
          </p>

        </div>

        <form onSubmit={handleChangePassword} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full border border-gray-300 p-3 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              OTP
            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >

            {loading ? "Updating Password..." : "Reset Password"}

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

export default VerifyOtp;