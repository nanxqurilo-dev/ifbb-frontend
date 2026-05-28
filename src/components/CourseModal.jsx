import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";

const CourseModal = ({ close, module }) => {
    return (
        <div className='absolute left-0 min-h-screen  w-full flex items-center justify-center top-0 z-50 bg-black/50'>

            <div onClick={close} className='bg-white cursor-pointer rounded-full z-[1000] p-1 absolute top-4 left-4'>
                <IoMdCloseCircle size={30} />
            </div>


            <div className="flex h-full w-full flex-col max-w-7xl m-6 gap-4 items-center justify-center p-10 bg-white  ">

                <h1 className="text-xl font-semibold pt-8">{module}</h1>

                <div className="    p-4 bg-white  shadow-lg">
                    <div className="w-auto max-w-4xl aspect-video">
                        <iframe
                            className="w-full h-full "
                            src="https://www.youtube.com/embed/csZxnUNrRIg"
                            title="Course Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                </div>

                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi necessitatibus iure fuga hic, ea deleniti nam porro quibusdam cumque praesentium ipsa modi repellendus soluta distinctio dolorem eaque, facilis ducimus, perspiciatis aut. Dolores provident illo, laborum incidunt nam doloremque repellat sapiente perspiciatis eum, ipsa ipsum explicabo natus quo illum minus corrupti hic cum labore? Tempora totam possimus culpa quod placeat nostrum voluptas minima modi. In voluptatibus id quo commodi similique doloribus itaque provident mollitia explicabo officia facilis, iusto neque numquam reprehenderit nihil! Tempore expedita rerum quidem id dignissimos sequi aliquid doloremque consequatur odit natus perferendis explicabo laborum esse, repudiandae sed earum.
                </p>
            </div>
        </div>
    )
}

export default CourseModal
