import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
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
        console.log('Navigating to course:', id);
        navigate(`/CourseDetail/${id}`);
    };

    const fetchAllCourses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("user-auth-token");
            
            // If no token, still try to fetch courses (for public access)
            const config = token ? {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            } : {};

            const res = await axios.get(`${API_URL}/api/user/get-all-courses`, config);

            console.log("Mera Kitna Course Hai", res.data);

            if (res.data && Array.isArray(res.data)) {
                setAllCourses(res.data);
            } else if (res.data && res.data.courses && Array.isArray(res.data.courses)) {
                setAllCourses(res.data.courses);
            } else {
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
        <div>
            {/* Hero Section - Split Layout */}
            <div className="relative h-250 bg-black overflow-hidden">
                {/* Background Gradient Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center min-h-screen py-12">
                        
                        {/* Left Side - Content */}
                        <div className="space-y-8 animate-slide-in-left">
                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                                    Build Your
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                                        Dream Physique
                                    </span>
                                </h1>
                                
                                <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Most people fail at building muscle because they don't have a plan. 
                                    They're winging workouts, eating wrong, and burning out fast.
                                </p>
                                
                                <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border-l-4 border-red-600 p-5 rounded-r-xl backdrop-blur-sm">
                                    <h3 className="text-white font-bold text-xl mb-2">
                                        ✨ This Course Fixes All That
                                    </h3>
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        You'll get a complete, science-backed system that takes you from beginner to beast, with zero confusion.
                                    </p>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                                        ✓
                                    </div>
                                    <span className="text-white font-medium">Science-Backed Training</span>
                                </div>
                                
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                                        ✓
                                    </div>
                                    <span className="text-white font-medium">Nutrition Plans</span>
                                </div>
                                
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                                        ✓
                                    </div>
                                    <span className="text-white font-medium">Expert Guidance</span>
                                </div>
                                
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                                        ✓
                                    </div>
                                    <span className="text-white font-medium">Lifetime Access</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                                <button 
                                    onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50 hover:scale-105"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Courses
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>

                        </div>

                        {/* Right Side - Image */}
                        <div className="relative animate-slide-in-right">
                            <div className="relative">
                                {/* Decorative Elements */}
                                <div className="absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-red-600/30 to-orange-600/30 rounded-full blur-3xl" />
                                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-full blur-3xl" />
                                
                                {/* Main Image */}
                                <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                    <img
                                        src="/home2.png"
                                        alt="Fitness Transformation"
                                        className="w-full h-auto object-cover"
                                    />
                                    
                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Courses Section */}
            <div id="courses-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full font-semibold text-sm mb-4">
                            📚 Our Programs
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                            The Ultimate Bodybuilding Course
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Choose from our comprehensive courses designed to help you achieve your fitness goals
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-8">
                        {loading ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-600 mt-4">Loading courses...</p>
                            </div>
                        ) : allCourses.length > 0 ? (
                            allCourses.map((course, index) => (
                                <div key={course._id || course.id || index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <CourseCard
                                        {...course}
                                        id={course._id || course.id}
                                        handleGetId={() => handleGetId(course._id || course.id)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 bg-white rounded-3xl shadow-xl p-12 max-w-md">
                                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-5xl">📚</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h3>
                                <p className="text-gray-500 text-base">
                                    Check back soon for new courses
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col lg:flex-row items-stretch justify-center w-full bg-white shadow-2xl">
                <div className="w-full lg:w-1/2 relative overflow-hidden">
                    <img
                        src="/contactimagecourse.png"
                        alt="Fitness Models"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                </div>

                <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white p-8 lg:p-16 space-y-8 flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
                            <span className="text-red-400 text-sm font-semibold">💬 Get In Touch</span>
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                            Have Questions?
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                We're Here to Help!
                            </span>
                        </h2>
                        
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Not sure if this course is right for you? Need help with enrollment or payments?
                        </p>
                    </div>

                    <div className="space-y-4">
                        <a href="tel:00875784568" className="group flex items-center gap-5 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                📞
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Call Us</p>
                                <p className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                                    (00) 875 784 568
                                </p>
                            </div>
                        </a>

                        <a href="mailto:info@gmail.com" className="group flex items-center gap-5 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                ✉️
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Email Us</p>
                                <p className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                                    info@gmail.com
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
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
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
            `}</style>
        </div>
    );
};

export default Course;