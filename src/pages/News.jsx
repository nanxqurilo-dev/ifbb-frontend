import React from 'react'
import HeadingBanner from '../components/HeadingBanner'
import NewsBanner from '../assets/NewsBanner.png'
import NewComponent from '../components/New'

const News = () => {
    return (
        <>
            <HeadingBanner title={"News"} src={NewsBanner} />
            <NewComponent /> 
        </>
    )
}

export default News
