import React from 'react'
import HeadingBanner from '../components/HeadingBanner'
import GalleryBanner from '../assets/GalleryBanner.jpg'
import GImg from '../components/Gallery'

const Gallery = () => {
  return (

    <>
      <HeadingBanner title={"Gallery"} src={GalleryBanner} />
      <GImg />
    </>
  )
}

export default Gallery
 