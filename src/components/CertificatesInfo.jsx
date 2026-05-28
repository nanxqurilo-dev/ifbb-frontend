import React from 'react'

import { LuDot } from "react-icons/lu";


const CertificatesInfo = () => {

    const list = [
        { id: 1, title: "International Federation of Bodybuilding & Fitness (IFBB)", content: "The global governing body for bodybuilding and fitness, ensuring the highest standards in education and certification" },
        { id: 2, title: "National Olympic Committees (NOCs)", content: "Many NOCs recognize IFBB certifications for their alignment with international sports and fitness standards." },
        { id: 3, title: "World Anti-Doping Agency (WADA)", content: "Collaboration with WADA ensures adherence to anti-doping regulations, adding credibility to IFBB certifications." },
        { id: 4, title: "European Union of Bodybuilding & Fitness (EBFF)", content: "A regional arm of IFBB that supports recognition across Europe." },
        { id: 5, title: "International Council for Health, Physical Education, Recreation, Sport, and Dance (ICHPER-SD)", content: "Recognized globally for promoting health and fitness education." },
        { id: 6, title: "National Sports Authorities", content: "Various sports councils and fitness bodies in countries across the globe recognize IFBB certifications as a benchmark for professionalism and expertise." },
        { id: 7, title: "World Fitness Federation (WFF)", content: "An affiliate organization that aligns with IFBB’s standards in promoting fitness and health." },
        { id: 8, title: "Academic Institutions", content: "Universities and colleges offering sports science and fitness programs acknowledge the quality of IFBB certification for professional practice." },
        { id: 9, title: "Professional Fitness Associations", content: "Recognized by associations like the American Council on Exercise (ACE) and National Academy of Sports Medicine (NASM) as complementary credentials." },
        { id: 10, title: "Corporate Gyms and Wellness Centers", content: "Leading global gym franchises and wellness centers accept IFBB-certified professionals as qualified for employment and consultation." },
    ]
    return (
        <div className='h-full w-full'>
            <h4 className='md:text-2xl text-xl  font-semibold my-6'>The certifications issued by IFBB (International Federation of Bodybuilding & Fitness) in fitness and bodybuilding are recognized and accredited by various prestigious organizations and institutions worldwide. Below is a list of key entities that recognize IFBB certifications:</h4>

 
            <div className='flex flex-col gap-4  '>
                {list.map((l) => (
                    <ul key={l.id} className=''>
                        <li className='text-lg font-medium'>
                            {l.id}.  {l.title}
                        </li>
                        <li className="md:px-8 px-4 flex gap-1 items-start md:items-center">
                            <LuDot size={20} /> <p> {l.content}
                            </p>

                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default CertificatesInfo
