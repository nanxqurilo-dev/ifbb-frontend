import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/apiUrl";
import { FaCheckCircle, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading"); 
    const [message, setMessage] = useState("Verifying your payment...");

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            setStatus("error");
            setMessage("Invalid payment session.");
            setTimeout(() => navigate("/course"), 3000);
            return;
        }

        const verifyPayment = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/api/payments/stripe-success`,
                    {
                        params: { session_id: sessionId },
                    }
                );

                // console.log("Payment verify response:", res.data);

                if (res.data?.success) {
                    setStatus("success");
                    setMessage("Payment successful! Redirecting to courses...");
                    setTimeout(() => {
                        navigate("/course"); // safest redirect
                    }, 2200);
                } else {
                    throw new Error("Verification failed");
                }
            } catch (err) {
                console.error("Payment verification error:", err);
                setStatus("error");
                setMessage("Payment verification failed. Please contact support.");
                setTimeout(() => navigate("/course"), 4000);
            }
        };

        verifyPayment();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-16 max-w-lg w-full text-center border border-emerald-100">

                {status === "loading" && (
                    <>
                        <FaSpinner className="animate-spin text-emerald-600 text-8xl mx-auto mb-8" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Processing Payment
                        </h1>
                        <p className="text-lg text-gray-600">{message}</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <FaCheckCircle className="text-green-500 text-9xl mx-auto mb-8" />
                        <h1 className="text-4xl font-bold text-green-700 mb-4">
                            Payment Successful!
                        </h1>
                        <p className="text-xl text-gray-700 font-medium">{message}</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <FaExclamationTriangle className="text-red-500 text-8xl mx-auto mb-8" />
                        <h1 className="text-4xl font-bold text-red-700 mb-4">
                            Something Went Wrong
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">{message}</p>
                        <button
                            onClick={() => navigate("/course")}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition"
                        >
                            Back to Courses
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;