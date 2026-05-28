import React from 'react'
import Logo from "../assets/Logo.png"
import { Link } from 'react-router-dom'
import {
    FaLinkedin,

    FaFacebook,

    FaYoutube,
} from "react-icons/fa";
import {
    FaInstagram, FaXTwitter
} from "react-icons/fa6"

const Footer = () => {
    const links = [

        { title: "About", to: "/about" },
        { title: "Courses", to: "/courses" },
        { title: "Certificates", to: "/certificates" },
        { title: "Contact", to: "/contact" },
    ]
    const FooterLinks = [

        { title: "Privacy Policy", to: "/privacy-policy" },
        { title: "Terms of Service", to: "/terms-of-service" },
        { title: "Cookies Settings", to: "/cookies" }, 
    ]
    
    const socialMedia = [
        {
            icon: <FaInstagram />
            , to: ""
        },
        { icon: <FaFacebook />, to: "" },
        { icon: <FaXTwitter />, to: "" },
        { icon: <FaLinkedin />, to: "" },
        { icon: <FaYoutube />, to: "" },
    ]
    return (
        <footer className='py-10 px-6 max-w-5xl mx-auto h-full'>

            <div className="flex max-md:flex-col gap-4 mb-10  justify-between items-center  ">

                <div className="w-14">
                    <img src={Logo} alt="logo" />
                </div>

                <div className='flex items-center gap-4 text-sm font-semibold'>
                    {links.map((l, index) => (
                        <Link key={index} to={l.to} >
                            {l.title}
                        </Link>
                    ))}
                </div>


                <div className='flex items-center gap-4 text-sm font-semibold'>
                    {socialMedia.map((s, index) => (
                        <div key={index} >
                            <Link to={s.to} > <p className='text-blue-800 text-xl'>{s.icon}</p>
                            </Link>


                        </div>
                    ))}
                </div>

            </div>
           <hr />
            <div className='mt-10 flex max-md:flex-col items-center justify-center gap-6 w-full'>
                <p className='text-center text-xs text-zinc-400'>© 2026 Shipon. All rights reserved.</p>
           

                <div className='flex items-center gap-4 text-xs text-zinc-400'>
                    {FooterLinks.map((f, index) => (
                        <Link key={index} to={f.to} >
                            {f.title}
                        </Link>
                    ))}
                </div>  </div>
        </footer >
    )
}

export default Footer
