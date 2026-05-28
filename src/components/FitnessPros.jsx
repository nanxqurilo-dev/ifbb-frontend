import React from 'react'
import Pro1 from "/pro1.png"
import Pro2 from "/1749813548232.jpg" // Corrected import

const FitnessPros = () => {
    const pros = [
        { id: 1, scr: Pro1, name: "Dr. Rafael Santonja", about: "President of IFBB Academy" },
        { id: 2, scr: Pro2, name: "Shady Hamed", about: "Director of IFFCB Academy Australia" },
    ]

    return (
        <div className='h-full w-full md:py-10 py-4'>
            <h1 className='md:text-5xl sm:text-3xl text-2xl font-bold text-center roboto'>
                Affiliation And Recognition 
            </h1>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-10 px-10">
                {pros.map((p) => (
                    <div key={p.id} className='h-full w-full flex items-center flex-col gap-6'>
                        <div className='rounded-lg overflow-hidden  w-full'>
                            {/* <img src={p.scr} alt={p.name} className=' h-[500px] w-full ' /> */}
                            <img
  src={p.scr}
  alt={p.name}
 className='h-[500px] w-full object-cover object-top'
//className='h-[500px] w-full object-contain'
/>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h4 className='text-xl font-medium'>{p.name}</h4>
                            <p className='text-zinc-600 font-medium'>{p.about}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FitnessPros
