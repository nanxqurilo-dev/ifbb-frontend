import React, { useEffect, useState } from "react";
import { FaStar, FaBook, FaClock, FaLock, FaUnlock, FaSpinner, FaCheckCircle, FaTimesCircle, FaArrowRight, FaCheck, FaTimes, FaChevronUp, FaChevronDown, FaSignInAlt } from "react-icons/fa";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/apiUrl";

const CourseDetail = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [unlockedUpto, setUnlockedUpto] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // PDF Viewer State
  const [pdfUrl, setPdfUrl] = useState(null);

  // Review State
  const [reviewData, setReviewData] = useState({});
  const [loadingReview, setLoadingReview] = useState({});
  const [expandedReviewModule, setExpandedReviewModule] = useState(null);

  // Exam States
  const [examMode, setExamMode] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examLoading, setExamLoading] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState(new Set());
  const [examResults, setExamResults] = useState(null);
  const [completingModule, setCompletingModule] = useState(null);

  // ==================== RATING STATES ====================
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingMessage, setRatingMessage] = useState("");

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("user-auth-token");
    const email = localStorage.getItem("user-email");
    const storedUserId = localStorage.getItem("user-id");

    if (token && email && email !== "user@example.com") {
      setIsLoggedIn(true);
      if (storedUserId) setUserId(storedUserId);
      fetchCourseData();
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("user-auth-token");

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const res = await axios.get(`${API_URL}/api/user/get-one-course/${id}`, config);
      if (!res.data || !res.data.course) {
        setError("Course not found");
        return;
      }

      const courseContent = res.data.course;
      const purchased = Boolean(res.data.hasPurchased);
      const unlocked = res.data.unlockedUpto !== undefined ? res.data.unlockedUpto : -1;

      if (res.data.userId) {
        setUserId(res.data.userId);
        localStorage.setItem("user-id", res.data.userId);
      }

      if (courseContent && courseContent.modules) {
        const updatedModules = courseContent.modules.map((module, index) => ({
          ...module,
          locked: index > unlocked,
        }));
        courseContent.modules = updatedModules;
      }

      setCourseData(courseContent);
      setHasPurchased(purchased);
      setUnlockedUpto(unlocked);
    } catch (err) {
      console.error("❌ Error fetching course:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        setIsLoggedIn(false);
        localStorage.removeItem("user-auth-token");
        localStorage.removeItem("user-email");
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || "Error loading course");
      }

      setHasPurchased(false);
      setUnlockedUpto(-1);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewData = async (moduleIndex) => {
    if (!courseData?.modules[moduleIndex]) return;

    const module = courseData.modules[moduleIndex];
    setLoadingReview((prev) => ({ ...prev, [moduleIndex]: true }));

    try {
      const token = localStorage.getItem("user-auth-token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const response = await axios.get(
        `${API_URL}/api/user/course/${id}/module/${module._id}/test-result`,
        config
      );

      if (response.data?.success) {
        const score = response.data.score;
        if (score >= 60) {
          setReviewData((prev) => ({
            ...prev,
            [moduleIndex]: response.data,
          }));
        }
      }
    } catch (err) {
      console.error("❌ Error fetching review:", err);
    } finally {
      setLoadingReview((prev) => ({ ...prev, [moduleIndex]: false }));
    }
  };

  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      alert("Payment canceled. You can try purchasing again.");
    }
    if (searchParams.get("session_id")) {
      setTimeout(() => {
        fetchCourseData();
      }, 1000);
    }
  }, [searchParams]);

  const toggleModule = (index) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: `/course/${id}`, message: "Please login to view course content" },
      });
      return;
    }

    if (index <= unlockedUpto || hasPurchased) {
      setOpenIndex(openIndex === index ? null : index);
      if (openIndex !== index && !reviewData[index] && !loadingReview[index]) {
        fetchReviewData(index);
      }
    }
  };

  const handlePurchase = async () => {
    const token = localStorage.getItem("user-auth-token");
    const userEmail = localStorage.getItem("user-email");

    if (!token || !isLoggedIn) {
      navigate("/login", {
        state: { from: `/course/${id}`, message: "Please login to purchase" },
      });
      return;
    }

    if (!userEmail || userEmail === "user@example.com") {
      alert("Please login again to continue.");
      navigate("/login");
      return;
    }

    setIsPurchaseLoading(true);

    try {
      localStorage.setItem("lastPurchasedCourseId", id);

      const response = await axios.post(
        `${API_URL}/api/payments/create-checkout-session`,
        { courseId: id, userEmail },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      console.error("❌ Payment error:", error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Payment initiation failed. Please try again.";
      alert(errMsg);
      setIsPurchaseLoading(false);

      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const markModuleComplete = async (moduleIndex) => {
    if (!hasPurchased || !courseData || !isLoggedIn) return;

    const module = courseData.modules[moduleIndex];
    setCompletingModule(moduleIndex);

    try {
      const token = localStorage.getItem("user-auth-token");
      await axios.post(
        `${API_URL}/api/user/course/${id}/module/${module._id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Module marked as complete!");
      await fetchCourseData();
    } catch (error) {
      console.error("❌ Error marking module complete:", error);
      alert("Error marking module as complete. Please try again.");
    } finally {
      setCompletingModule(null);
    }
  };

  const startExam = (moduleIndex) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: `/course/${id}`, message: "Please login to take exam" },
      });
      return;
    }

    if (moduleIndex <= unlockedUpto) {
      setCurrentModuleIndex(moduleIndex);
      setExamMode(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setExamSubmitted(false);
      setSkippedQuestions(new Set());
      setExamResults(null);
    }
  };

  const exitExam = () => {
    if (confirm("Are you sure you want to exit the exam?")) {
      setExamMode(false);
      setCurrentModuleIndex(null);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setExamSubmitted(false);
      setSkippedQuestions(new Set());
      setExamResults(null);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });
  };

  const handleNextQuestion = () => {
    if (courseData && currentModuleIndex !== null) {
      const module = courseData.modules[currentModuleIndex];
      if (currentQuestionIndex < module.test.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkipQuestion = () => {
    const newSkipped = new Set(skippedQuestions);
    newSkipped.add(currentQuestionIndex);
    setSkippedQuestions(newSkipped);
    handleNextQuestion();
  };

  const submitExam = async () => {
    if (!courseData || currentModuleIndex === null || !isLoggedIn) return;

    const currentModule = courseData.modules[currentModuleIndex];
    const answersArray = [];

    for (let i = 0; i < currentModule.test.questions.length; i++) {
      if (selectedAnswers[i] !== undefined) {
        answersArray.push({ questionIndex: i, selectedOptionIndex: selectedAnswers[i] });
      }
    }

    if (answersArray.length < currentModule.test.questions.length) {
      const unanswered = currentModule.test.questions.length - answersArray.length;
      if (!confirm(`You have ${unanswered} unanswered question(s). Do you want to submit anyway?`)) {
        return;
      }
    }

    setExamLoading(true);

    try {
      const token = localStorage.getItem("user-auth-token");
      const moduleId = courseData.modules[currentModuleIndex]._id;
      const response = await axios.post(
        `${API_URL}/api/user/course/${id}/module/${moduleId}/test`,
        { answers: answersArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const backendResult = response.data;
      const detailedResults = [];

      for (let i = 0; i < currentModule.test.questions.length; i++) {
        const question = currentModule.test.questions[i];
        const userAnswer = selectedAnswers[i];
        if (userAnswer !== undefined) {
          detailedResults.push({
            questionIndex: i,
            selectedOption: userAnswer,
            question: question.question,
            options: question.options,
          });
        }
      }

      setExamResults({
        passed: backendResult.passed,
        percentage: backendResult.score,
        correctCount: backendResult.correctCount,
        totalQuestions: backendResult.totalQuestions,
        passPercentage: backendResult.passPercentage,
        detailedResults: detailedResults,
      });

      setExamSubmitted(true);

      if (backendResult.passed) {
        alert("Congratulations! You passed the exam! Next module unlocked!");
        setTimeout(async () => {
          await fetchCourseData();
          setExamMode(false);
          setCurrentModuleIndex(null);
          setCurrentQuestionIndex(0);
          setSelectedAnswers({});
          setExamSubmitted(false);
          setExamResults(null);
          setSkippedQuestions(new Set());
        }, 2000);
      } else {
        alert(`❌ You scored ${backendResult.score}%. You need ${backendResult.passPercentage}% to pass. Please try again.`);
      }
    } catch (error) {
      console.error("❌ ERROR SUBMITTING EXAM");
      if (error.response?.status === 500) {
        alert("Backend Error 500. Check browser console and backend logs for details.");
      } else if (error.response?.status === 400) {
        alert("Bad Request: " + (error.response?.data?.message || "Invalid exam submission"));
      } else if (error.response?.status === 401) {
        alert("Unauthorized. Please login again.");
        navigate("/login");
      } else {
        alert("Error submitting exam: " + (error.response?.data?.message || error.message));
      }
    } finally {
      setExamLoading(false);
    }
  };

  // ==================== RATING SUBMIT ====================
  const handleRatingSubmit = async () => {
    if (selectedRating === 0) {
      alert("Please select a star rating before submitting.");
      return;
    }

    const token = localStorage.getItem("user-auth-token");
    let extractedUserId = userId || localStorage.getItem("user-id");

    if (!extractedUserId && token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        extractedUserId = payload._id || payload.id || payload.userId || payload.sub;
      } catch (e) {
        console.error("Token decode error:", e);
      }
    }

    if (!extractedUserId) {
      alert("User ID not found. Please login again.");
      navigate("/login");
      return;
    }

    setRatingLoading(true);
    setRatingMessage("");

    try {
      const response = await axios.post(
        `https://api.ifbb.qurilo.com/api/user/course/user-rating`,
        {
          user_id: extractedUserId,
          course_id: id,
          value: selectedRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        setRatingSubmitted(true);
        setRatingMessage(
          `✅ Rating submitted! Average: ${response.data.data.averageRating} (${response.data.data.totalRatings} ratings)`
        );
      }
    } catch (err) {
      console.error("❌ Rating error:", err);
      const msg = err.response?.data?.message || "Failed to submit rating. Please try again.";
      setRatingMessage(`❌ ${msg}`);
    } finally {
      setRatingLoading(false);
    }
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  // Review Results Component
  const ReviewSection = ({ moduleIndex, data }) => {
    if (!data) return null;

    const { score, totalQuestions, result } = data;
    const totalCorrect = result?.filter((r) => r.isCorrect)?.length || 0;

    return (
      <div className="mt-6 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded">
        <div
          className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
          onClick={() =>
            setExpandedReviewModule(expandedReviewModule === moduleIndex ? null : moduleIndex)
          }
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 p-1 rounded-full bg-green-600 text-white font-bold text-sm">
              {score}%
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Your Review</p>
            </div>
          </div>
          <div className="text-green-600 text-sm">
            {expandedReviewModule === moduleIndex ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        {expandedReviewModule === moduleIndex && (
          <div className="mt-5 border-t pt-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-1 rounded border border-emerald-200">
                <p className="text-sm text-gray-600 font-semibold">Score</p>
                <p className="text-sm font-bold text-green-600">{score}%</p>
              </div>
              <div className="bg-white p-1 rounded border border-emerald-200">
                <p className="text-sm text-gray-600 font-semibold">Correct Answers</p>
                <p className="text-sm font-bold text-blue-600">
                  {totalCorrect}/{totalQuestions}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-bold text-gray-900 mb-4 text-sm">Detailed Answers</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {result?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded border-2 ${item.isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {item.isCorrect ? (
                          <FaCheckCircle className="text-green-600 text-sm" />
                        ) : (
                          <FaTimesCircle className="text-red-600 text-sm" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">
                          Q{idx + 1}: {item.question}
                        </p>
                        <div className="space-y-2">
                          <p className={`text-sm font-medium ${item.isCorrect ? "text-green-700" : "text-red-700"}`}>
                            Your Answer:{" "}
                            <span className="font-bold">
                              {item.options[item.userSelectedOptionIndex]}
                            </span>
                          </p>
                          {!item.isCorrect && (
                            <p className="text-sm font-medium text-blue-700">
                              Correct Answer:{" "}
                              <span className="font-bold">
                                {item.options[item.correctOptionIndex]}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==================== NOT LOGGED IN VIEW ====================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded shadow p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <FaSignInAlt className="text-blue-600 text-5xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-8">
            You need to login to view course details and access course content.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/login", { state: { from: `/course/${id}` } })}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaSignInAlt /> Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="w-full py-3 px-6 bg-gray-200 text-gray-900 font-bold rounded hover:bg-gray-300 transition"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-bold rounded hover:bg-gray-200 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded shadow-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <FaTimesCircle className="text-red-600 text-5xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-8">{error || "The course you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded hover:from-blue-700 hover:to-indigo-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    courseThumbnail,
    discountedPrice,
    actual_price,
    price,
    durationToComplete,
    modules = [],
    ratings = [],
    total_enrolled_user = 0,
  } = courseData;

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + (r.value || 0), 0) / ratings.length).toFixed(1)
      : "0.0";

  // ==================== PDF VIEWER MODAL ====================
  if (pdfUrl) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded w-full max-w-6xl h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-1 border-b bg-gradient-to-r from-blue-600 to-indigo-600 rounded">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"></h3>
            <button
              onClick={closePdfViewer}
              className="bg-white text-red-600 p-2 rounded hover:bg-red-50 transition font-bold flex items-center gap-2"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title="PDF Viewer"
              onError={(e) => {
                console.error("❌ PDF Load Error:", e);
                alert("Error loading PDF. Please check if the link is valid.");
              }}
            />
          </div>
          <div className="p-3 border-t bg-gray-50 flex justify-between items-center">
            <p className="text-sm text-gray-600">💡 Tip: Use browser zoom controls if text is too small</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold text-sm"
            >
              Open in New Tab →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==================== EXAM MODE ====================
  if (examMode && currentModuleIndex !== null && courseData?.modules) {
    const currentModule = courseData.modules[currentModuleIndex];
    const questions = currentModule.test?.questions || [];
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    if (examSubmitted && examResults) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded overflow-hidden">
              <div
                className={`p-8 text-white ${examResults.passed
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-red-500 to-orange-500"
                  }`}
              >
                <div className="text-center">
                  <div className="mb-4">
                    {examResults.passed ? (
                      <FaCheckCircle size={40} className="mx-auto text-white" />
                    ) : (
                      <FaTimesCircle size={40} className="mx-auto text-white" />
                    )}
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    {examResults.passed ? "Exam Passed! 🎉" : "Exam Failed ❌"}
                  </h2>
                  <p className="text-xl opacity-90">
                    You scored {examResults.percentage}% (Required: {examResults.passPercentage}%)
                  </p>
                </div>
              </div>

              <div className="p-2">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 p-2 rounded border border-blue-200">
                    <p className="text-gray-600 text-sm">Correct Answers</p>
                    <p className="text-sm font-bold text-blue-600">
                      {examResults.correctCount}/{examResults.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded border border-purple-200">
                    <p className="text-gray-600 text-sm">Your Score</p>
                    <p className="text-sm font-bold text-purple-600">{examResults.percentage}%</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold mb-6 text-gray-900">Your Submitted Answers</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {examResults.detailedResults.map((result, idx) => (
                      <div key={idx} className="p-4 rounded border-2 bg-blue-50 border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 mb-2">
                              Q{result.questionIndex + 1}: {result.question}
                            </p>
                            <p className="text-sm text-blue-700">
                              Your answer: {result.options[result.selectedOption]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    ℹ️ Detailed correct answers are evaluated by the backend
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setExamMode(false);
                      setCurrentModuleIndex(null);
                      setCurrentQuestionIndex(0);
                      setSelectedAnswers({});
                      setExamSubmitted(false);
                      setExamResults(null);
                    }}
                    className="flex-1 bg-blue-600 text-sm text-white py-2 px-2 rounded font-bold hover:bg-blue-700 transition"
                  >
                    Back to Course
                  </button>
                  {!examResults.passed && (
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setSelectedAnswers({});
                        setExamSubmitted(false);
                        setSkippedQuestions(new Set());
                        setExamResults(null);
                      }}
                      className="flex-1 bg-orange-600 text-sm text-white py-2 px-2 rounded font-bold hover:bg-orange-700 transition"
                    >
                      Retake Exam
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded shadow p-6 border-b-4 border-blue-500">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-900">{currentModule.title}</h2>
                <p className="text-gray-600 text-sm">Module Exam</p>
              </div>
              <button
                onClick={exitExam}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition font-bold"
              >
                Exit Exam
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  Answered: {answeredCount}/{totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-full font-bold text-sm transition ${idx === currentQuestionIndex
                      ? "bg-blue-600 text-white ring-2 ring-blue-300"
                      : selectedAnswers[idx] !== undefined
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : skippedQuestions.has(idx)
                          ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white shadow p-8">
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-6">
                {currentQuestion?.question}
              </h3>
              <div className="space-y-3">
                {currentQuestion?.options?.map((option, optionIdx) => (
                  <label
                    key={optionIdx}
                    className={`flex items-center p-4 border-2 rounded cursor-pointer transition ${selectedAnswers[currentQuestionIndex] === optionIdx
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={selectedAnswers[currentQuestionIndex] === optionIdx}
                      onChange={() => handleAnswerSelect(optionIdx)}
                      className="w-5 h-5 text-blue-600 cursor-pointer"
                    />
                    <span className="ml-4 text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-between">
              <div className="flex gap-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-2 py-1 bg-gray-300 text-sm text-gray-900 rounded font-bold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleSkipQuestion}
                  className="px-2 py-1 bg-yellow-500 text-sm text-white rounded font-bold hover:bg-yellow-600 transition"
                >
                  Skip
                </button>
              </div>

              {currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  onClick={submitExam}
                  disabled={examLoading}
                  className="px-2 py-2 bg-green-600 text-white text-sm rounded font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  {examLoading ? (
                    <><FaSpinner className="animate-spin" /> Submitting...</>
                  ) : (
                    <> Submit Exam</>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-2 py-1 bg-blue-600 text-sm text-white rounded font-bold hover:bg-blue-700 transition flex items-center gap-2"
                >
                  Next <FaArrowRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== NORMAL COURSE VIEW ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-4 px-2">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left - Course Details */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded overflow-hidden shadow">
              <div className="relative h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <span className="bg-red-600 text-white text-sm m-1 absolute rounded border-none outline-none p-1">
                  {parseInt(discountedPrice)}%
                </span>
                <img
                  src={courseThumbnail}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800";
                  }}
                />
              </div>

              <div className="p-6 space-y-5">
                <h2 className="text-sm font-bold text-gray-900">{title}</h2>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-orange-50 px-1 py-1 rounded border border-orange-100">
                    <FaStar className="text-orange-500" />
                    <span className="font-semibold text-orange-600">{averageRating}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-1 py-1 rounded border border-blue-100">
                    <FaClock className="text-blue-500" />
                    <span className="font-semibold text-blue-600">
                      {(durationToComplete / 60).toFixed(1)} hrs
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 px-1 py-1 rounded border border-purple-100">
                    <FaBook className="text-purple-500" />
                    <span className="font-semibold text-purple-600">{modules.length} modules</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

                <div className="border-t pt-2 space-y-3">
                  <div className="flex items-center gap-3">


                    {discountedPrice && (
                      <p className="text-sm line-through text-gray-500">${price}</p>
                    )}

                    <p className="text-sm font-bold  text-green-600">
                      ${actual_price?.$numberDecimal}
                    </p>
                    {/* {discountedPrice && (
                      <p className="text-sm text-gray-500">${price}</p>
                    )} */}
                  </div>
                  <p className="text-gray-700 text-sm font-medium">
                    Purchased by <span className="font-bold">{total_enrolled_user}</span> users
                  </p>
                </div>

                {/* ==================== RATING SECTION ====================
                    Sirf tab dikhega jab hasPurchased === true ho
                ======================================================== */}
                {hasPurchased && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-bold text-gray-800 mb-2">Rate This Course</p>

                    {ratingSubmitted ? (
                      <div className="p-3 bg-green-50 border border-green-300 rounded text-center">
                        <p className="text-green-700 font-semibold text-sm">{ratingMessage}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSelectedRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="focus:outline-none transition-transform hover:scale-110"
                              aria-label={`Rate ${star} star`}
                            >
                              <FaStar
                                className={`text-2xl transition-colors ${star <= (hoveredRating || selectedRating)
                                    ? "text-orange-400"
                                    : "text-gray-300"
                                  }`}
                              />
                            </button>
                          ))}
                          {selectedRating > 0 && (
                            <span className="ml-2 text-sm font-semibold text-orange-500">
                              {selectedRating}/5
                            </span>
                          )}
                        </div>

                        <button
                          onClick={handleRatingSubmit}
                          disabled={ratingLoading}
                          className={`w-full py-2 px-4 text-sm font-bold rounded transition flex items-center justify-center gap-2 ${ratingLoading
                              ? "bg-gray-300 cursor-not-allowed text-gray-500"
                              : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                            }`}
                        >
                          {ratingLoading ? (
                            <><FaSpinner className="animate-spin" /> Submitting...</>
                          ) : (
                            <><FaStar /> Submit Rating</>
                          )}
                        </button>

                        {ratingMessage && !ratingSubmitted && (
                          <p className="text-red-600 text-xs font-medium text-center">
                            {ratingMessage}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {/* ==================== END RATING SECTION ==================== */}

                {!hasPurchased ? (
                  <button
                    onClick={handlePurchase}
                    disabled={isPurchaseLoading}
                    className={`w-full mt-6 py-3 px-4 font-bold text-sm rounded shadow-lg flex items-center justify-center gap-3 transition-all ${isPurchaseLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl cursor-pointer text-white"
                      }`}
                  >
                    {isPurchaseLoading ? (
                      <><FaSpinner className="animate-spin" size={24} /> Processing...</>
                    ) : (
                      <><span className="text-sm"></span> Purchase Now</>
                    )}
                  </button>
                ) : (
                  <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 flex items-center justify-center border-green-300 rounded">
                    <div className="flex items-center gap-4 text-green-700">
                      <p className="font-bold flex items-center justify-center text-sm">
                        Course Unlocked!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Modules */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded p-2">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-3">
                Course Content
              </h3>

              {modules.length === 0 ? (
                <div className="text-center text-sm py-5 text-gray-400">
                  <FaBook size={50} className="mx-auto mb-4 opacity-40" />
                  <p>No modules added yet.</p>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  {modules.map((module, index) => {
                    const isLocked = index > unlockedUpto;
                    const hasTest = module.test?.questions?.length > 0;
                    const isActive = index <= unlockedUpto;
                    const isExpanded = openIndex === index;

                    return (
                      <div
                        key={module._id}
                        className={`border-2 text-sm rounded px-3 py-2 transition-all ${isLocked
                            ? "border-gray-200 opacity-70 cursor-not-allowed"
                            : isActive
                              ? "border-blue-300 bg-blue-50 cursor-pointer hover:border-blue-400 hover:bg-blue-100"
                              : "border-gray-200 hover:border-gray-300 cursor-default"
                          }`}
                      >
                        <div
                          className="flex text-sm justify-between items-center"
                          onClick={() => !isLocked && toggleModule(index)}
                        >
                          <div className="flex text-sm items-center gap-4 flex-1">
                            <span
                              className={`w-10 h-10 text-sm rounded-full flex items-center justify-center text-white font-bold ${isLocked ? "bg-gray-400" : "bg-blue-600"
                                }`}
                            >
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <p className={`font-semibold ${isLocked ? "text-gray-500" : "text-gray-900"}`}>
                                {module.title}
                              </p>
                              <p className="text-sm mt-1">
                                {index <= unlockedUpto ? (
                                  <span className="text-green-600 text-sm">✅ Unlocked</span>
                                ) : (
                                  <span className="text-amber-600 text-sm">🔒 Locked</span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {isLocked ? (
                              <FaLock className="text-amber-500" />
                            ) : (
                              <>
                                <FaUnlock className="text-green-600" />
                                <div className="text-blue-600 text-lg text-sm">
                                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {isActive && isExpanded && (
                          <div className="mt-4 text-sm border-t pt-4 space-y-4">
                            {module.assetLink &&
                              (Array.isArray(module.assetLink)
                                ? module.assetLink.map((pdf, pdfIndex) => (
                                  <button
                                    key={pdfIndex}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPdfUrl(`${pdf}#toolbar=0&navpanes=0&scrollbar=0`);
                                    }}
                                    className="w-full bg-blue-600 text-white text-sm px-2 py-3 rounded hover:bg-blue-700 transition font-bold mb-2"
                                  >
                                    Read Module Content {pdfIndex + 1}
                                  </button>
                                ))
                                : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPdfUrl(`${module.assetLink}#toolbar=0&navpanes=0&scrollbar=0`);
                                    }}
                                    className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 transition font-bold"
                                  >
                                    Read Module Content
                                  </button>
                                )
                              )}

                            {hasTest && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startExam(index);
                                }}
                                className="w-full text-sm bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 transition"
                              >
                                Take Exam ({module.test.questions.length} questions)
                              </button>
                            )}

                            {loadingReview[index] && (
                              <div className="mt-4 p-4 bg-gray-50 rounded flex items-center justify-center gap-2">
                                <FaSpinner className="animate-spin text-blue-600" />
                                <p className="text-gray-600 font-medium">Loading review...</p>
                              </div>
                            )}

                            {reviewData[index] && (
                              <ReviewSection moduleIndex={index} data={reviewData[index]} />
                            )}
                          </div>
                        )}

                        {isLocked && (
                          <p className="text-sm text-amber-600 mt-3 flex items-center gap-2">
                            <FaLock /> Complete previous module to unlock
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;