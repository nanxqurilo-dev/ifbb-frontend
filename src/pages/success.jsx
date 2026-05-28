import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [status, setStatus] = useState("loading"); 
    const [message, setMessage] = useState("Verifying your payment...");

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (!sessionId) {
            setStatus("error");
            setMessage("Invalid payment session.");
            setTimeout(() => router.push("/courses"), 3000);
            return;
        }

        const verifyPayment = async () => {
            try {
                const token = localStorage.getItem("user-auth-token");

                if (!token) {
                    router.push("/login");
                    return;
                }

                const res = await axios.get(
                    `${API_URL}/api/payments/stripe-success`,
                    {
                        params: { session_id: sessionId },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.data?.success) {
                    setStatus("success");
                    setMessage("Payment successful! Redirecting to your course...");

                    const courseId = res.data.courseId;
                    setTimeout(() => {
                        router.push(`/coursedetail/${courseId}`);
                    }, 2000);
                } else {
                    throw new Error("Verification failed");
                }
            } catch (err) {
                console.error("Payment verification error:", err);
                setStatus("error");
                setMessage("Payment verification failed. Please contact support.");
                setTimeout(() => router.push("/courses"), 4000);
            }
        };

        verifyPayment();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">

                {status === "loading" && (
                    <>
                        <Loader2 className="animate-spin text-emerald-600 w-20 h-20 mx-auto mb-6" />
                        <h1 className="text-2xl font-bold">Processing Payment</h1>
                        <p className="text-gray-600 mt-3">{message}</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-green-700">Payment Successful</h1>
                        <p className="text-gray-700 mt-3">{message}</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <AlertTriangle className="text-red-500 w-20 h-20 mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
                        <p className="text-gray-700 mt-3">{message}</p>
                    </>
                )}
            </div>
        </div>
    );
}