import React from 'react'
import HeadingBanner from '../components/HeadingBanner'
import NewsBanner from '../assets/NewsBanner.png'
import NewComponent from '../components/New'
import FooterBanner from '../components/FooterBanner'

const News = () => {
    return (
        <>
            <HeadingBanner title={"News"} src={NewsBanner} />
            <NewComponent /> 

            <FooterBanner />

        </>
    )
}

export default News
