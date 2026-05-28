import React from 'react'
import Contact from '../components/Contact.jsx'

const ContactUs = () => {
    return (

        <div className='h-full w-full flex lg:gap-14 max-lg:flex-col px-4 items-center justify-center  max-w-6xl mx-auto py-10'>
            <div className='  lg:w-1/2 lg:block h-full flex overflow-hidden items-center justify-center'>
                <img src={"/contactUs.png"} alt="contact" className='object-cover h-full w-full' />
                {/* <div className="bg-black bg-opacity-60 text-white p-6 text-sm sm:text-base">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Contact Information</h2>
                    <p className="mb-1">
                        📞 Phone: <a href="tel:+61415551737" className="hover:underline">+61 415 551 737</a>
                    </p>
                    <p>
                        📧 Email: <a href="mailto:Ifbbacademyaustralia@hotmail.com" className="hover:underline">Ifbbacademyaustralia@hotmail.com</a>
                    </p>
                </div> */}
            </div>

            <div className="lg:w-1/2">
                <Contact />
            </div>


        </div>


    )
}

export default ContactUs
