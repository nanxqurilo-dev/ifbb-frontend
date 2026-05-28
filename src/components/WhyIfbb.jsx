import React from 'react'
import whyIfbbImg from "/home2.png"
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const WhyIfbb = () => {

    const naviagte = useNavigate()

    const why = [
        {
            title: "Expert Trainers",
            desc: "Our certified trainers provide personalized guidance and expert advice to help you achieve your fitness goals."
        }, {
            title: "State-of-the-Art Equipment",
            desc: "Work out with the latest and most advanced fitness equipment to maximize your results and enhance your experience."
        }, {
            title: "Comprehensive Programs",
            desc: "Enjoy a variety of classes and programs tailored to all fitness levels, from beginner to advanced."
        },

    ]




    return (
        <div className='max-w-6xl mx-auto roboto flex max-md:flex-col  items-center justify-between gap-10 px-8 md:py-10 py-6'>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <div className="md:h-[600px] h-full md:max-w-[400px]  w-full overflow-hidden rounded-2xl">
                    <img src={whyIfbbImg} alt="" className='h-full w-full object-cover' />
                </div>

            </div>

            <div className='w-full md:w-1/2 flex flex-col gap-8'>

                <div className='  flex flex-col gap-6' >
                    <h2 className='text-zinc-900 font-bold md:text-3xl text-2xl'>Why Choose IFBB Academy ?</h2>
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

export default WhyIfbb;
