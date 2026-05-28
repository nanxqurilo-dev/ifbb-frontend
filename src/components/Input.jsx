import React from 'react'


const Input = ({detail,handleChange}) => {
    return (
        <div >
            <label className="block mb-1 font-medium">{detail.label}</label>
            <input
                name={detail.name}
                type={detail.type}
                placeholder={detail.placeholder}
                value={detail.value}
                onChange={handleChange}
                required
                className="w-full border border-zinc-300 rounded px-3 py-2"
            />
        </div>

    )
}

export default Input
