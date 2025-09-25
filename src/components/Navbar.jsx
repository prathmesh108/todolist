import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-violet-600 text-white py-2'>
    <div className="logo">
        <span className='font-bold text-xl mx-8'>iTask</span>
    </div>
    <ul className="flex gap-9 mx-8">
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default Navbar
