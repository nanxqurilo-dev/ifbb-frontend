import React from 'react'
import HeadingBanner from '../components/HeadingBanner'
import CertificatesImg from '../components/CertificatesImg'
import Certificates from '../assets/certificates.jpg'


const Certficates = () => {
  return (
    <>
  
        <HeadingBanner title={"Certificates offered by the Academy"} src={Certificates} />
        {/* <EnrollmentCallToAction /> */}
        <CertificatesImg />

    </>
  )
}

export default Certficates
