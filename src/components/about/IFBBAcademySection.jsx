import React from 'react';

const IFBBAcademySection = () => {
  // const experts = [
  //   "Dr. Rafael Santonja – Sport Nutrition – Spain",
  //   "Dr. Nieves Lopes Cillanueva – Sport Nutrition – Spain",
  //   "Dr. Mauricio de Arruda Campos – Sports Kinesiology and Biomechanics – Brazil",
  //   "Prof. Dr. Adolfo Morán – Medical Doctor (Cardiology) – Spain",
  //   "Prof. Dr. Eduardo Henrique De Rose – Medical Doctor (Sport Medicine) – Brazil",
  //   "Prof. Dr. Fernando Enríquez Corrales – Medical Doctor (Sport Medicine) – Spain",
  //   "Prof. Dr. Sadegh Hashemi – Sport Physiology – Iran",
  //   "Prof. Pawel Filberon – Training Methods Specialist – Poland",
  //   "Prof. Ott Kiivikas – Nutrition and Supplementation Performance Specialist – Estonia",
  //   "Prof. Juan Fernandes Paredes Sanchez – Sport Periodization Specialist – Equator"
  // ];

  const offerings = [
    "Personal Fitness Trainer Certification",
    "Advanced Bodybuilding & Fitness Trainer Specialist",
    "Personal Trainer Functional Fitness",
    "Master in Bodybuilding and Fitness Methods",
    "Master Fitness Coach & Cross Training Degree",
    "IFBB International Competition Coach",
    "Basic Nutrition",
    "Advanced Nutrition",
    "Abdominal Training Prescription Specialist",
    "Fitness Challenge Coach"
  ];

  return (
    <div className="text-gray-800">
      {/* <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">
          The courses contents and textbooks were compiled by the IFBB Education and Research Commission,
          This commission has medical doctors, professors and experienced coaches who are linked to IFBB.
        </h2>
        <p className="mb-6 text-sm">
          Thus, we compiled updated scientific evidence based information with practical experience from all the
          professionals involved with weight training and the sport of Bodybuilding from all over the world,
          as we are in 203 countries affiliated.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          {experts.map((expert, idx) => (
            <li key={idx}>{expert}</li>
          ))}
        </ul>
      </section> */}
      {/* <section className="relative text-white px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95 z-0" />
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent z-0" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-xl font-semibold mb-6">
            Become an International Personal Trainer with IFBB Academy Australia
          </h2>
          <p className="text-base md:text-xl leading-relaxed">
            Welcome to IFBB Academy Australia, where we are committed to providing world-class education in
            fitness and bodybuilding. As part of the globally renowned International Federation of Bodybuilding &amp; Fitness (IFBB),
            we focus on delivering comprehensive courses designed to equip individuals with the knowledge and
            qualifications required to become certified personal trainers.
          </p>
          <p className="mt-6 text-base md:text-xl leading-relaxed">
            Our academy is dedicated to those passionate about advancing their careers in the fitness industry.
            Whether you're an aspiring personal trainer or looking to deepen your understanding of fitness and
            bodybuilding, our programs are tailored to provide you with the skills, expertise, and confidence to
            excel professionally.
          </p>
        </div>
      </section> */}

      {/* <section className="px-6 py-12 max-w-6xl mx-auto">
        <div>
          <h1 className='text-xl font-semibold pb-3'>Our Mission</h1>
          <p className='text-xl'>To educate and empower individuals with a deep understanding of fitness and bodybuilding principles while adhering to global standards of excellence and professionalism.</p>
        </div>
        <div>
          <h1 className='text-base text-black font-semibold pt-3 pb-3'>Why Choose IFBB Academy Australia?</h1>
          <p className='text-base pt-2'>Global Recognition: Our certifications are internationally recognized, offering career opportunities worldwide.</p>
          <p className='text-base pt-2'>Expert-Led Courses: Our programs are developed by professionals with a focus on practical knowledge and the latest scientific insights.</p>
          <p className='text-base pt-2'>Comprehensive Curriculum: Designed to meet the needs of the fitness industry, our courses cover everything from anatomy and physiology to advanced training methodologies.</p>
          <p className='text-base pt-2'>Focus on Education: We are dedicated exclusively to teaching, ensuring a focused and enriching learning experience.</p>
          <p className='text-base pt-2'>Pathway to Certification: Gain the credentials needed to establish yourself as a professional personal trainer and succeed in the competitive fitness industry.</p>
        </div>
      </section> */}

      {/* Bottom Section: What We Offer */}
      <section className="p-2  py-12 max-w-6xl mx-auto">
        <h3 className="text-zinc-900 pb-5 font-bold md:text-3xl text-2xl">What We Offer</h3>
        <ul className="space-y-4 text-base">
          {offerings.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {/* Blue circle with white checkmark */}
              <span className="w-5 h-5 flex items-center justify-center bg-blue-800 rounded-full shrink-0 mt-1">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default IFBBAcademySection;
