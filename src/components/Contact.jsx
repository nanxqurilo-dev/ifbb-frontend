
import React, { useState } from "react";
import Input from "./Input";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    course: "",
    state: "",
    message: "",
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (formData.phone.length < 10) {
      setError("Phone number must be at least 10 digits");
      return false;
    }
    if (!formData.dob) {
      setError("Date of birth is required");
      return false;
    }
    if (!formData.course.trim()) {
      setError("Course selection is required");
      return false;
    }
    if (!formData.state.trim()) {
      setError("State is required");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.ifbb.qurilo.com/api/course-inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit inquiry");
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        course: "",
        state: "",
        message: "",
        termsAccepted: false,
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputDetails = [
    {
      label: "Name",
      name: "name",
      type: "text",
      value: formData.name,
      placeholder: "Enter Your Name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      placeholder: "Enter Your email",
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phone",
      value: formData.phone,
      placeholder: "Enter Your Phone number",
    },
    {
      label: "Date Of Birth",
      type: "date",
      name: "dob",
      value: formData.dob,
      placeholder: "Enter Your DOB",
    },
    {
      label: "Selected Course",
      type: "text",
      name: "course",
      value: formData.course,
      placeholder: "Select Course",
    },
    {
      label: "State",
      type: "text",
      name: "state",
      value: formData.state,
      placeholder: "Enter your state",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto max-md:px-8 px-6 py-16 sm:py-28">
      <h1 className="text-xl font-bold text-center mb-2">
        Get in Touch with IFBB
      </h1>
      <p className="text-center text-zinc-600 mb-6">
        We're Here to Help You on Your Fitness Journey. Reach Out to Us with Any
        Questions or to Schedule a Visit!
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Your inquiry has been submitted successfully! We'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputDetails.map((detail, index) => (
          <Input
            key={index}
            detail={detail}
            handleChange={handleChange}
            required={true}
          />
        ))}

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Type your message..."
            className="w-full border border-zinc-300 rounded resize-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2424B9]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            name="termsAccepted"
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="border rounded cursor-pointer"
          />
          <label className="text-sm cursor-pointer">
            I accept the{" "}
            <a href="#" className="text-[#2424B9] underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2424B9] hover:bg-blue-800"
          } font-semibold text-white px-6 py-2 rounded transition-all duration-200`}
        >
          {loading ? "Submitting..." : "Submit Now"}
        </button>
      </form>
    </div>
  );
};

export default Contact;