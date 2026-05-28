import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* -------- Base URL -------- */
const BASE_URL = 'https://api.ifbb.qurilo.com';

/* -------- Helpers -------- */
const formatDuration = (minutes = 0) => {
  const min = Number(minutes) || 0;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
};

const formatPrice = (value) => {
  const num = Number(value);
  return isNaN(num) ? "0.00" : num.toFixed(1);
};

/* -------- CourseCard Component -------- */
function CourseCard({
  title,
  courseThumbnail,
  discountedPrice,
  price,
  durationToComplete,
  _id,
  modules,
  ratings,
  purchasedByHowMuch,
  handleGetId,
  actual_price,
  isPurchased = false
}) {
  // const rating =
  //   ratings?.length
  //     ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
  //     : "0.0";

  const rating =
  ratings.length > 0
    ? (
        ratings.reduce((sum, r) => sum + (r.value || 0), 0) /
        ratings.length
      ).toFixed(1)
    : "0.0";

  return (
    <div className="border border-indigo-400 rounded p-3 w-full max-w-[300px] flex flex-col items-start shadow-sm bg-white">
      {/* Image */}
            <span className="bg-red-600 text-white text-sm m-1 absolute rounded border-none outline-none p-1">
        {parseInt(discountedPrice)}%
      </span>
      <div className="w-full h-48 mb-3 rounded overflow-hidden">
        <img
          src={courseThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rating & Price */}
      <div className="w-full flex justify-between text-sm font-medium mb-1">
        <span className="text-red-500">⭐ {rating}</span>

        <span className="text-indigo-500 font-semibold">
          {price ? (
            <>
              <span className="line-through text-gray-400 mr-1">
                {/* ${formatPrice(discountedPrice)} */}
                <span>${formatPrice(price)}</span>
              </span>
              {/* <span>${formatPrice(price)}</span> */}
              ${formatPrice(actual_price)}
            </>
          ) : (
            <>${formatPrice(actual_price?.$numberDecimal)}</>
          )}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold h-[50px] mb-2 p-1">{title}</h3>

      {/* Meta info */}
      <div className="text-sm text-gray-600 flex justify-between w-full mb-4 px-1">
        <span>📄 {modules?.length || 0} Module(s)</span>
        <span>⏱ {formatDuration(durationToComplete)}</span>
        <span>👥 {purchasedByHowMuch || 0}+</span>
      </div>

      {/* Button - Conditional based on isPurchased */}
      <button
        className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded text-sm mx-auto w-full transition-colors"
        onClick={() => {
          handleGetId(_id);
        }}
      >
        {isPurchased ? 'Read Course' : 'Enroll →'}
      </button>
    </div>
  );
}

/* -------- Main PurchaseCourse Component -------- */
function PurchaseCourse() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('user-auth-token');
      
      if (!token) {
        console.log('No token found - user not logged in');
        setError('Please login to view your courses');
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/api/user/purchased-courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });


      console.log("data",response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPurchasedCourses(data.purchasedCourses || []); 
      
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
      setError(error.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  // Course detail page pe navigate karo
  const handleGetId = (courseId) => {
    navigate(`/CourseDetail/${courseId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your courses...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white border border-red-200 rounded p-6 max-w-md w-full text-center shadow-sm">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPurchasedCourses}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (purchasedCourses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white border border-gray-200 rounded p-8 max-w-md w-full text-center shadow-sm">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Purchased Courses
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't purchased any courses yet. Start learning today!
          </p>
          <button
            onClick={() => navigate('/Course')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded font-medium transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  // Main content

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-xl font-bold text-gray-900 mb-2">
            My Purchased Courses
          </h1>
          <p className="text-gray-600">
            You have {purchasedCourses.length} course{purchasedCourses.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {purchasedCourses.map((course) => (
            <div key={course._id} className="flex justify-center">
              <CourseCard
                _id={course._id}
                title={course.title}
                courseThumbnail={course.courseThumbnail}
                discountedPrice={course.discountedPrice}
                actual_price={course.actual_price?.$numberDecimal}
                price={course.price}
                durationToComplete={course.durationToComplete}
                modules={course.totalModules ? Array(course.totalModules).fill(null) : []}
                ratings={course.ratings}
                purchasedByHowMuch={course.total_enrolled_user}
                handleGetId={handleGetId}
                isPurchased={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PurchaseCourse;