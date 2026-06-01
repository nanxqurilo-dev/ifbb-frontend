import React from 'react'
import HeadingBanner from '../components/HeadingBanner'
import CertificatesImg from '../components/CertificatesImg'
import Certificates from '../assets/certificates.jpg'
import FooterBanner from '../components/FooterBanner'


const Certficates = () => {
  return (
    <>
  
        <HeadingBanner title={"Certificates offered by the Academy"} src={Certificates} />
        {/* <EnrollmentCallToAction /> */}
        <CertificatesImg />


<FooterBanner />

    </>
  )
}

export default Certficates
