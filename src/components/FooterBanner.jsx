import React from 'react';
import FooterBannerImg from '../assets/FooterBanner.jpg';

const FooterBanner = () => {
    return (
        <div className="relative h-[500px] max-h-[500px] w-full bg-black overflow-hidden">

            <img
                src={FooterBannerImg}
                alt="Footer Banner"
                className="absolute   w-full h-full  object-cover"
            />

            <div className="absolute  inset-0 flex flex-col items-center justify-center text-white bg-black/40 px-4 sm:gap-4 gap-2">
                <h1 className="md:text-3xl sm:text-2xl text-xl font-bold text-center">Take the First Step Towards a Healthier You</h1>
                <p className="text-center max-w-xl sm:text-sm text-xs">Join FitLife Studio Today and Transform Your Life with Expert Guidance, Personalized Programs, and a Supportive Community. Your Fitness Journey Starts Now!</p>

                <form action="" className='flex items-center gap-2 sm:gap-4 py-4 sm:text-base text-sm'>
                    {/* <input type="text" placeholder="Enter your email" className='rounded-sm px-4 py-2 text-black bg-white'/> */}
                    <button className="px-4 py-2 bg-[#2424B9] font-semibold text-white rounded-sm flex gap-2 items-center w-fit ">Join Now</button>

                </form>

                <p className="sm:text-xs text-[10px] text-center">By clicking Sign Up you're confirming that you agree with our Terms and Conditions.</p>
            </div>
        </div>
    );
};

export default FooterBanner;
