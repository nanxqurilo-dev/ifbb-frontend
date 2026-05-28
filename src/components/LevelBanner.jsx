import React, { useState } from 'react'
import BannerImg from '../assets/Banner.jpg'
import QrCode from '../assets/QrCode.png'

const LevelBanner = () => {
    const [active, setActive] = useState(0)
    const level = [
        "Level1",
        "Level2",
        "Level3",

    ]
    return (
        <div className='bg-[#0F202B] flex max-md:flex-col items-center justify-between gap-10'>
            <div className='md:w-1/2 md:max-h-[300px] overflow-hidden'>
                <img src={BannerImg} alt="banner" className='h-full w-full object-cover' />
            </div>

            <div className='md:w-1/2 flex flex-col items-center gap-6 justify-center md:px-6 px-4'>
                <p className='text-zinc-300  text-base font-medium'>IFBB - Join our Exclusive Training Courses! Level - 1 , Level - 2 , Level - 3</p>

                <div className='pb-8 md:pb-0 flex gap-10 items-center justify-evenly w-full'>
                    <div><img src={QrCode} alt="" className='h-full w-full' /></div>
                    <div className='flex flex-col items-center  gap-4'>
                        {level.map((l, index) => (

                            <button key={index} onClick={() => setActive(index)} className={`px-6 py-2 ${active === index ? " bg-[#2424B9]" : "bg-none  border border-zinc-300"}  font-semibold text-white text-sm rounded-sm flex gap-2 items-center w-full `}>{l}</button>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LevelBanner
