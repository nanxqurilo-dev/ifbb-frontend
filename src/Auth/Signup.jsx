// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { API_URL } from "../api/apiUrl";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       toast.error("All fields required");
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.post(
//         `${API_URL}/api/user/user-sign-up`,
//         { name, email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       toast.success("Signup successful. Please login.");
//       navigate("/login");
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Signup failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSignup}
//         className="w-full max-w-md p-6 border rounded space-y-4"
//       >
//         <h2 className="text-xl font-bold text-center">Signup</h2>

//         <input
//           placeholder="Name"
//           className="w-full border p-3 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-3 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-3 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-black text-white py-3 rounded"
//         >
//           {loading ? "Creating..." : "Signup"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TbLoader3 } from "react-icons/tb";
import { API_URL } from "../api/apiUrl";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordLength = form.password.length;
    if (passwordLength < 6 || passwordLength > 15) {
      toast.error("Password must be 6 to 15 characters long");
      return;
    }

    setIsDisabled(true);
    try {
      await axios.post(`${API_URL}/api/user/user-sign-up`, form, {
        withCredentials: true,
      });

      toast.success("Signed up successfully!");
      navigate("/"); 
    } catch (err) {
      console.log("error",err)
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-contain bg-center hidden border-blue-600 lg:block"
        style={{ backgroundImage: "url('src/assets/signupImage.png')" }}
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-semibold">Create your account!</h2>
          <p className="text-gray-500">Enter your full details</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                name: "name",
                type: "text",
                placeholder: "Username",
                icon: "👤",
              },
              {
                name: "email",
                type: "email",
                placeholder: "Email ",
                icon: "📧",
              },
            ].map((fld) => (
              <div
                key={fld.name}
                className="flex items-center border rounded-md px-3 py-2"
              >
                <span className="mr-2">{fld.icon}</span>
                <input
                  name={fld.name}
                  type={fld.type}
                  placeholder={fld.placeholder}
                  value={form[fld.name]}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none"
                />
              </div>
            ))}

            <div className="flex flex-col">
              <div className="flex items-center border rounded-md px-3 py-2">
                <span className="mr-2">🔒</span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (6-15 characters)"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-gray-500 ml-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {form.password &&
                (form.password.length < 6 || form.password.length > 15) && (
                  <p className="text-sm text-red-500 mt-1">
                    Password must be between 6 to 15 characters
                  </p>
                )}
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((prev) => !prev)}
                className="accent-blue-600"
              />
              <span className="text-sm text-blue-600">Remember me</span>
            </label>

            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2 ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isDisabled && <TbLoader3 className="animate-spin" />}
              {isDisabled ? "Submitting..." : "Continue"}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
