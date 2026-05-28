import React from 'react'
import Hero from '../components/Hero'

import FooterBanner from '../components/FooterBanner'


import HeroModel from "../assets/HeroModelImg.png";
import FitnessPros from '../components/FitnessPros'
import HomeIfbb from '../components/about/HomeIfbb'
import HometwoAbout from '../components/about/Home2'
import IFBBAcademySection from '../components/about/IFBBAcademySection'

const About = () => {
  return (

    <>
   

        <Hero title={"Become a International IFBB PT with IFBB Academy Australia"}
          HeroModel={HeroModel}
        />
        <FitnessPros />
        <HomeIfbb />
        <HometwoAbout />
        {/* <Contact /> */}
        <IFBBAcademySection/>
        <FooterBanner />
      
    </>

  )
}

export default About
