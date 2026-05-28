import React, { useState } from "react";
import HeroImg from "../assets/bg.jpg";
import { MdArrowForwardIos, MdPlayArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Hero = ({ title, HeroModel }) => {
    const [showModal, setShowModal] = useState(false);
const navigate = useNavigate()
    const handleWatchDemo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="relative h-[80vh] w-full overflow-hidden">
                <div className="absolute h-full w-full z-20 bg-black/50"></div>
                <img src={HeroImg} alt="Hero" className="absolute z-0 w-full h-full" />
                <img
                    src={HeroModel}
                    alt="Hero"
                    className="absolute z-10 -right-6 bottom-0 h-full w-auto object-cover"
                />

                <div className="relative h-full z-30 flex flex-col md:gap-8 sm:gap-6 gap-4 md:items-start items-center justify-center pt-4 text-white lg:px-20 sm:px-10 px-6 max-w-3xl">
                    <h1 className="text-center md:text-start text-3xl sm:text-4xl md:text-6xl italic font-extrabold mb-4">
                        {title}
                    </h1>
                    <p className="text-center md:text-start text-sm font-semibold">
                        Join IFFB Academy Today and Experience Expert Training, Personalized Programs, and a Supportive Community to Achieve Your Fitness Goals.
                    </p>
                    <div className="flex items-center md:gap-8 gap-2">
                        <button className="px-4 py-2 bg-[#2424B9] font-semibold text-white rounded-sm flex gap-2 items-center max-sm:text-sm" onClick={()=>navigate('/course')}>
                            Get Started <MdArrowForwardIos size={14} />
                        </button>

                        <button
                            onClick={handleWatchDemo}
                            className="px-4 py-2 font-semibold text-white rounded-sm flex gap-2 items-center"
                        >
                            <p className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
                                <MdPlayArrow color="#2424B9" size={16} />
                            </p>
                            Watch Demo
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
        {/* Clickable Overlay to Close */}
        <div
            onClick={handleCloseModal}
            className="absolute inset-0 cursor-pointer"
        ></div>

        {/* Modal Content */}
        <div className="relative bg-black rounded-lg w-full max-w-4xl z-10 shadow-2xl mx-4 md:mx-0">
            
            {/* Close Button */}
            <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-white text-3xl font-bold z-20 hover:text-[#FF4D4D] transition duration-200"
                aria-label="Close"
            >
                &times;
            </button>

            {/* Video */}
            <video
                src="/1024X768.mp4"
                controls
                autoPlay
                className="w-full h-auto rounded-md"
            />
        </div>
    </div>
)}


        </>
    );
};

export default Hero;
