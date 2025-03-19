import { Html } from '@react-three/drei'
import React from 'react'

const Loader = () => {
  return (
    <Html>
        <div className='absolute top-0 left-0w-full h-full flex justify-center items-start'>
            <div className='w-[10vw] rounded-full h-[10vw]'>
                Loading...
            </div>

        </div>
        </Html>
  )
}

export default Loader
