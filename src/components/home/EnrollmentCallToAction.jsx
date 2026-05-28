import React from 'react';
import { useNavigate } from 'react-router-dom';

const EnrollmentCallToAction = () => {
    const naviagte = useNavigate()
  return (
    <section className="text-center px-6 py-16">
      <h2 className="text-3xl md:text-5xl  mb-6">
        Join Our Exclusive Training Courses!
      </h2>
      <p className=" md:text-2xl mb-3 w-[90%] mx-auto">
      By the end of the course, you will have earned a Personal Training Certificate from IFBB.
      </p>
      <p className=" md:text-2xl mb-3">
        To know more about the Certifications{' '}
        <a
      onClick={()=>naviagte("/certificates")}    
      className="text-blue-700 font-medium underline"
        >
          Please Check
        </a>
      </p>
      <p className="text-2xl font-medium mb-6">
        👉 Register now to secure your spot ...
      </p>
      <button className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded shadow transition" onClick={()=>naviagte("/signup")}>
        Register Now
      </button>
    </section>
  );
};

export default EnrollmentCallToAction;
