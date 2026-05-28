import React, { useState } from 'react'
import whyIfbbImg from "/about1.png"
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const HometwoAbout = () => {
   const [showModal, setShowModal] = useState(false);

    const handleWatchDemo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const naviagte = useNavigate()

    const why = [
        {
            title: "Global Recognition",
            desc: "Our certifications are internationally recognized, offering career opportunities worldwide."
        }, 
        {
            title: "Expert-Led Courses",
            desc: "Our programs are developed by professionals with a focus on practical knowledge and the latest scientific insights."
        }, {
            title: "Comprehensive Curriculum",
            desc: "Designed to meet the needs of the fitness industry, our courses cover everything from anatomy and physiology to advanced training methodologies."
        }, {
            title: "Focus on Education",
            desc: ": We are dedicated exclusively to teaching, ensuring a focused and enriching learning experience."
        }, {
            title: "Pathway to Certification",
            desc: " Gain the credentials needed to establish yourself as a professional personal trainer and succeed in the competitive fitness industry."
        },

    ]




    return (
        <div className='max-w-6xl p-2 mx-auto roboto flex max-md:flex-col  items-center justify-between gap-10  md:py-10 py-6'>

            {/* <div className='w-full md:w-1/2 flex items-center justify-center'>
                <div className="md:h-[600px] h-full md:max-w-[400px]  w-full overflow-hidden rounded-2xl">
                    <img src={whyIfbbImg} alt="" className='h-full w-full object-cover' />
                </div>

            </div> */}

            <div className='w-full md:w-1/2 flex flex-col gap-8'>

                <div className='  flex flex-col gap-6' >
                    <h2 className='text-zinc-900 font-bold md:text-3xl text-2xl'>Our Advantages </h2>
                    <p className='text-zinc-600 text-sm sm:text-base font-normal'>Discover the Benefits That Set Us Apart and Propel Your Fitness Journey Forward.</p>
                </div>

                <div  className=' flex flex-col gap-4' >
                    {why.map((w, index) => (
 
                            <div key={index} className=' flex flex-col gap-4' >
                                <div className=' flex items-center gap-2' >

                                    <FaCheckCircle color='#2424B9' size={18} />
                                    <h5 className='text-zinc-900 font-semibold  '> {w.title}</h5>
                                </div>
                                <p className='text-zinc-600 text-sm  font-normal'>{w.desc}</p>
                             
                        </div>
                    ))}
                </div>

                <button className="px-4 py-2 bg-[#2424B9] font-semibold text-white rounded-sm flex gap-2 items-center w-fit " onClick={()=>naviagte('/course')}>Free Trial Today</button>

            </div>


        </div>
    )
}

export default HometwoAbout;
