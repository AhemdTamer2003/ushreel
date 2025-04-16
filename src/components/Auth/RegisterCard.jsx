import React from 'react'
import { Link } from 'react-router-dom'

function RegisterCard({ src, Title, discription, buttonText, to }) {
    return (
        <div className='flex flex-col rounded-lg justify-center items-center text-white bg-[#333] shadow-md'>
            <img className=' w-full' src={src} />
            <div className="card-content flex flex-col justify-center items-center p-6 gap-4 ">
                <h2 className='text-xl font-bold'>{Title}</h2>
                <p className='text-sm px-8'>{discription}</p>
                <Link to={to} className='bg-main w-1/2 px-6 py-2 rounded-lg text-center'>{buttonText}</Link>
            </div>
        </div>
    )
}

export default RegisterCard
