import React from 'react'

const HeadingBanner = ({ src, title }) => {
    return (
        <div className="relative h-[300px]   w-full overflow-hidden">

            <img
                src={src}
                alt="Hero"
                className="absolute  w-full h-full object-cover "
            />
            <div className="w-full h-full absolute z-20 bg-black/50"></div>
            <div className="relative z-30 h-full w-full flex flex-col md:items-start items-center justify-center  pt-4 text-white  max-w-5xl mx-auto">
                <h1 className="text-center mx-4   text-5xl md:text-6xl  font-extrabold ">
                    {title}
                </h1>


            </div>

        </div>
    )
}

export default HeadingBanner
