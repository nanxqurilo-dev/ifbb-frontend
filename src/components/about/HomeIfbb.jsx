import React from 'react'
import AboutImg from "/about2.png"

const HomeIfbb = () => {

    const about = [{
        title: "About IFBB Academy",
        desc: "IFBB Australia is the official Australian branch of the International Federation of Bodybuilding and Fitness. It oversees bodybuilding and fitness competitions across the country and promotes professional standards in training and coaching. IFBB Australia also offers internationally recognized certifications for personal trainers and fitness professionals, making it a trusted name in the Australian fitness industry."
    },]
    return (
        <div>
            <div className='max-w-6xl p-2 mx-auto roboto flex max-md:flex-col-reverse items-center justify-between   lg:gap-10 gap-6 md:py-10 py-2'>
                <div className='w-full  flex flex-col gap-10'>
                    {about.map((a, index) => (
                        <div key={index} className='w-full flex flex-col gap-6' >
                            <h2 className='text-zinc-900 font-bold md:text-3xl text-2xl'>{a.title}</h2>
                            <p className='text-zinc-600  font-normal'>{a.desc} </p>
                        </div>
                    ))}
                </div>



                {/* <div className='w-full md:w-1/2 flex items-center justify-center'>
                    <div className="md:h-[600px] h-full md:max-w-[400px] w-full overflow-hidden rounded-2xl">
                        <img src={AboutImg} alt="" className='h-full w-full object-cover' />
                    </div>

                </div> */}
            </div>
            <div>
                <div className="p-2 py-3 max-w-6xl mx-auto">
                    <div>
                        <h1 className='text-zinc-900  pb-5 font-bold md:text-3xl text-2xl'>Our Mission</h1>
                        <p className='text-zinc-600'>To educate and empower individuals with a deep understanding of fitness and bodybuilding principles while adhering to global standards of excellence and professionalism.</p>
                    </div>
                    <div>
                        <h1 className='text-zinc-900  pb-6 pt-6 font-bold md:text-3xl text-2xl'>Why Choose IFBB Academy Australia?</h1>
                        <p className='text-zinc-600 pt-2'>Global Recognition: Our certifications are internationally recognized, offering career opportunities worldwide.</p>
                        <p className='text-zinc-600 pt-2'>Expert-Led Courses: Our programs are developed by professionals with a focus on practical knowledge and the latest scientific insights.</p>
                        <p className='text-zinc-600 pt-2'>Comprehensive Curriculum: Designed to meet the needs of the fitness industry, our courses cover everything from anatomy and physiology to advanced training methodologies.</p>
                        <p className='text-zinc-600 pt-2'>Focus on Education: We are dedicated exclusively to teaching, ensuring a focused and enriching learning experience.</p>
                        <p className='text-zinc-600 pt-2'>Pathway to Certification: Gain the credentials needed to establish yourself as a professional personal trainer and succeed in the competitive fitness industry.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeIfbb
