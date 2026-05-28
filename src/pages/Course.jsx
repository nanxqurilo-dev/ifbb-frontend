import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// import Layout from '../Layout/Layout';
import CourseCard from '../components/common/CourseCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api/apiUrl';

const Course = () => {
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleGetId = (id) => {
        if (!id) {
            console.error('Course ID is missing');
            return;
        }
        navigate(`/CourseDetail/${id}`);
    };

    const fetchAllCourses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("user-auth-token");
            const decoded = token !== null ? jwtDecode(token) : null;
            const res = await axios.get(
                `${API_URL}/api/user/get-all-courses`,
                {
                    headers: {
                        ...(token && { Authorization: `Bearer ${token}` })
                    },
                    params: {
                        userId: decoded !== null ? decoded.userId : ""
                    }
                }
            );

            if (Array.isArray(res.data)) {
                setAllCourses(res.data);
            }
            else if (res.data?.courses && Array.isArray(res.data.courses)) {
                setAllCourses(res.data.courses);
            }
            else {
                setAllCourses([]);
            }


        } catch (error) {
            console.error('Failed to fetch courses', error);
            setAllCourses([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAllCourses();
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section - Split Layout */}
            <div className="relative min-h-screen bg-black overflow-hidden">
                {/* Background Gradient Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12 lg:py-0">
                        {/* Left Side - Content */}
                        <div className="animate-slide-in-left order-2 lg:order-1">
                            {/* Main Heading */}
                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-white leading-tight">
                                    Build Your
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                                        Dream Physique
                                    </span>
                                </h1>
                                <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
                            </div>

                            {/* Description */}
                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                                    Most people fail at building muscle because they don't have a plan.
                                    They're winging workouts, eating wrong, and burning out fast.
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                                {[
                                    "Science-Backed Training",
                                    "Nutrition Plans",
                                    "Expert Guidance",
                                    "Lifetime Access"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm py-2 px-3 sm:px-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-red-600/50 transition-all duration-300">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">
                                            ✓
                                        </div>
                                        <span className="text-white text-xs sm:text-sm lg:text-base font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                <button
                                    onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group relative px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50 hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Explore Courses
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="relative animate-slide-in-right order-1 lg:order-2 mb-8 lg:mb-0">
                            <div className="relative">
                                {/* Decorative Elements */}
                                <div className="absolute -top-4 sm:-top-6 lg:-top-8 -right-4 sm:-right-6 lg:-right-8 w-48 sm:w-56 lg:w-72 h-48 sm:h-56 lg:h-72 bg-gradient-to-br from-red-600/30 to-orange-600/30 rounded-full blur-3xl" />
                                <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -left-4 sm:-left-6 lg:-left-8 w-40 sm:w-48 lg:w-64 h-40 sm:h-48 lg:h-64 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-full blur-3xl" />

                                {/* Main Image */}
                                <div className="relative z-10 rounded sm:rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                    <img
                                        src="/home2.png"
                                        alt="Fitness Transformation"
                                        className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Section */}
            <div id="courses-section" className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 px-2">
                            The Ultimate Bodybuilding Course
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                        {loading ? (
                            <div className="text-center py-12 sm:py-16">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-600 text-sm sm:text-base mt-4">Loading courses...</p>
                            </div>
                        ) : allCourses.length > 0 ? (
                            allCourses.map((course, index) => (
                                // console.log("sanjay",course),
                                <div key={course._id || course.id || index} className="animate-fade-in-up w-full sm:w-auto flex justify-center">
                                    <CourseCard
                                        {...course}
                                        id={course._id || course.id}
                                        handleGetId={() => handleGetId(course._id || course.id)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 max-w-md mx-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <span className="text-3xl sm:text-4xl lg:text-5xl">📚</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h3>
                                <p className="text-sm sm:text-base text-gray-500">
                                    Check back soon for new courses
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col lg:flex-row items-stretch justify-center w-full bg-white shadow-2xl">
                <div className="w-full lg:w-1/2 relative overflow-hidden h-[200px] sm:h-[250px] md:h-[300px] lg:h-auto">
                    <img
                        src="/contactimagecourse.png"
                        alt="Fitness Models"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                </div>

                <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white p-6 sm:p-8 lg:p-12 xl:p-16 space-y-6 sm:space-y-8 flex flex-col justify-center">
                    <div className="space-y-3 sm:space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/20 border border-red-500/30 rounded">
                            <span className="text-red-400 text-xs sm:text-sm font-semibold">💬 Get In Touch</span>
                        </div>

                        <h2 className="text-xl sm:text-xl lg:text-xl xl:text-xl font-black leading-tight">
                            Have Questions?
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                We're Here to Help!
                            </span>
                        </h2>

                        <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                            Not sure if this course is right for you? Need help with enrollment or payments?
                        </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <a href="tel:00875784568" className="group flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded sm:rounded border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded sm:rounded flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                📞
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Call Us</p>
                                <p className="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-red-400 transition-colors">
                                    (00) 875 784 568
                                </p>
                            </div>
                        </a>

                        <a href="mailto:info@gmail.com" className="group flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded sm:rounded flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                ✉️
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Email Us</p>
                                <p className="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-red-400 transition-colors">
                                    ifbb@gmail.com
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Custom Animations CSS */}
            <style jsx>{`
                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-in-left {
                    animation: slide-in-left 0.8s ease-out;
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.8s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out both;
                }

                @media (max-width: 640px) {
                    .animate-slide-in-left,
                    .animate-slide-in-right {
                        animation-duration: 0.6s;
                    }
                }
            `}</style>
        </div>
    );
};

export default Course;