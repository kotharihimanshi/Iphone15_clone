import React from 'react'
import {appleImg, bagImg, searchImg} from '../Utils';
import {navLists} from '../Constants';


const Navbar = () => {
  return (
    <header className='w-full  py-5  px-5 flex justify-between items-center sm:px-10'>
        <nav className='flex w-full screen-max-width '>
            <img src= {appleImg} alt= "Apple" width={14} height={18} />

            <div className='flex flex-1 justify-center max-sm:hidden'>
                {navLists.map((nav) => (
                    <div key={nav} className='px-5 text-sm cursor-pointer text-gray-500 hover:text-white transition-all'>
                        {nav}
                    </div>
                ))}
            </div>

            <div className='flex gap-7 items-baseline max-sm:justify-end max-sm:flex-1'>
                <img src={searchImg} alt="Search" width={18} height={18} />
                <img src={bagImg} alt="Bag" width={18} height={18} />
            </div>
        </nav>
    </header>
  )
}

export default Navbar
