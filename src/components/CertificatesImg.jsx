import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CertificatesInfo from './CertificatesInfo'

const API_BASE_URL = 'https://api.ifbb.qurilo.com/api/certificates'

const CertificatesImg = () => {
  const [certificates, setCertificates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const categories = ['Trainer', 'Advance', 'Master']

  const categoryTitles = {
    Trainer: 'Personal Fitness and Trainer Specialist',
    Advance: 'Advanced Body Building & Fitness Certification',
    Master: 'Master in Body Building & Fitness Method Certification',
  }

  useEffect(() => {
    const fetchAllCertificates = async () => {
      try {
        setLoading(true)
        setError(null)

        const allCertificates = {}

        for (const category of categories) {
          try {
            const response = await axios.get(
              `${API_BASE_URL}?category=${category}`,
              {
                timeout: 10000,
                headers: {
                  'Content-Type': 'application/json',
                }
              }
            )

            if (response.data && response.data.success && Array.isArray(response.data.data)) {
              allCertificates[category] = {
                title: categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1),
                images: response.data.data.map(cert => ({
                  url: cert.fileUrl,
                  id: cert._id,
                  publicId: cert.publicId
                }))
              }
            } else {
              allCertificates[category] = {
                title: categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1),
                images: []
              }
            }
          } catch (categoryError) {
            console.error(`Error fetching ${category} certificates:`, categoryError)
            allCertificates[category] = {
              title: categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1),
              images: []
            }
          }
        }

        setCertificates(allCertificates)
      } catch (err) {
        console.error('Error fetching certificates:', err)
        setError('Failed to load certificates. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAllCertificates()
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (loading) {
    return (
      <div className='h-full w-full py-10 max-w-7xl mx-auto px-8'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
            <p className='mt-4 text-gray-600'>Loading certificates...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='h-full w-full py-10 max-w-7xl mx-auto px-8'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <p className='text-red-600 font-semibold'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='h-full w-full py-10 max-w-7xl mx-auto px-8'>
        {Object.keys(certificates).map((categoryKey) => {
          const category = certificates[categoryKey]
          
          // Only render if there are images
          if (!category.images || category.images.length === 0) {
            return null
          }

          return (
            <div key={categoryKey} className='py-4'>
              <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold text-center roboto'>
                {category.title}
              </h1>

              <div className='flex max-md:flex-col items-center justify-center gap-4 my-4'>
                {category.images.map((img, index) => (
                  <div 
                    key={img.id || index} 
                    className='w-full max-w-sm cursor-pointer'
                    onClick={() => setSelectedImage({ url: img.url, alt: `${category.title} ${index + 1}` })}
                  >
                    <img
                      src={img.url}
                      alt={`${category.title} ${index + 1}`}
                      className='w-full h-auto object-cover rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300'
                      onError={(e) => {
                        console.error(`Failed to load image: ${img.url}`)
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 fill=%22%23999%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage Not Available%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <CertificatesInfo />
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4'
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className='relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200'
              aria-label='Close image viewer'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>

            {/* Image Container */}
            <div className='flex items-center justify-center bg-gray-900 max-h-[90vh] overflow-auto'>
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className='w-full h-auto object-contain'
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 fill=%22%23999%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage Not Available%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>

            {/* Image Info */}
            <div className='bg-white px-6 py-4 text-center'>
              <p className='text-gray-700 text-sm'>{selectedImage.alt}</p>
              <p className='text-gray-500 text-xs mt-2'>Click outside or press ESC to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CertificatesImg