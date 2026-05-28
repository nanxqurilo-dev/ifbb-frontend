import React from 'react'
import joinCourseImg from "../assets/joinCourse.png" 

const JoinCourse = () => {

  return (
    <div className='max-w-5xl mx-auto roboto flex max-md:flex-col-reverse  items-center justify-between gap-10 px-8 md:py-10 py-6'>



      <div className='w-full md:w-1/2 flex flex-col gap-8'>

        <div className='w-full md:max-w-xs flex flex-col gap-6' >
          <h2 className='text-zinc-900 font-bold md:text-3xl text-2xl'>Join Our Exclusive Training Courses !</h2>
          <div className='flex flex-col gap-4'>
            <p className='text-zinc-600 text-sm sm:text-base font-normal'>We will have online course on 22 & 23 February
              the cost will be $3000 </p>
            <p className='text-zinc-600 text-sm sm:text-base font-normal'>
              You will get the personal training certificate
              from IFBB by the end of the course

            </p>
            <p className='text-zinc-600 text-sm sm:text-base font-normal'>
              To know more about the content <a href='/course' className='text-blue-500 underline cursor-pointer'> please check </a></p>
          </div>
        </div>


      <button className="px-4 py-2 bg-[#2424B9] font-semibold text-white rounded-sm flex gap-2 items-center w-fit ">Join Today</button>
     </div>



      <div className='w-full md:w-1/2  '>
        <div className=" w-full overflow-hidden ">
          <img src={joinCourseImg} alt="" className='h-full w-full object-cover' />
        </div>

      </div>

    </div>
  )
}



export default JoinCourse
