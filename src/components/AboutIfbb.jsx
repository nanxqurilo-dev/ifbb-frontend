import React from 'react'
import AboutImg from "../assets/about.jpg"

const AboutIfbb = () => {

    const about = [{
        title: "About IFBB Academy",
        desc: "The International Federation of Bodybuilding and Fitness (IFBB) is the world’s leading organization dedicated to the promotion and development of bodybuilding and fitness as a sport and lifestyle. Founded in 1946, the IFBB now includes over 200 affiliated national federations across the globe, organizing hundreds of events each year, including world-renowned championships and pro-qualifier contests."
    }, {
       
        desc: "Our mission is to foster excellence in physique sports through fair competition, athlete development, and global collaboration. Recognized by many international sporting authorities, the IFBB promotes integrity, sportsmanship, and the healthy pursuit of fitness at both amateur and professional levels."
    }]
    return (
        <div className='max-w-6xl mx-auto roboto flex max-md:flex-col-reverse items-center justify-between   lg:gap-10 gap-6 px-8 md:py-10 py-6'>

            <div className='w-full md:w-1/2 flex flex-col gap-10'>
                {about.map((a, index) => (
                    <div key={index} className='max-w-lg flex flex-col gap-6' >
                        <h2 className='text-zinc-900 font-bold md:text-3xl text-2xl'>{a.title}</h2>
                        <p className='text-zinc-600 md:text-lg font-normal'>{a.desc} </p>
                    </div>
                ))}



            </div>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <div className="md:h-[600px] h-full md:max-w-[400px] w-full overflow-hidden rounded-2xl">
                    <img src={AboutImg} alt="" className='h-full w-full object-cover' />
                </div>

            </div>
        </div>
    )
}

export default AboutIfbb
