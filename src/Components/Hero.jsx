import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo , smallHeroVideo } from '../Utils'

const Hero = () => {
  const [videoSrc , setvideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  const handleVideo = () => {
    if(window.innerWidth < 760){
      setvideoSrc(smallHeroVideo)
    }
    else{
      setvideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideo)
    return () => window.removeEventListener('resize', handleVideo)
  })

  useGSAP(() => {
    gsap.to('#hero' , {opacity:1, delay:1})
    gsap.to('#cta', {opacity:1, delay:1, y:-50  })
  }, [])


  return (
    <section className="w-full h-[calc(100vh-60px)] bg-black relative flex flex-col items-center">
    {/* Hero Text */}
    <p id="hero" className="text-center mt-25 font-semibold text-3xl text-gray-500 opacity-0 max-md:mb-6">
      iPhone 15 Pro
    </p>
  
    {/* Video Container */}
    <div className="w-10/12 md:w-9/12 max-md:w-11/12 sm:w-5/12">
      <video autoPlay muted loop playsInline key={videoSrc} className="pointer-events-none">
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  
    {/* CTA Section */}
    <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20 mt-6 md:mt-12">
      <a
        href="#Highlights"
        className="px-5 py-2 rounded-3xl bg-blue-500 text-white my-1 hover:bg-transparent border border-transparent hover:border hover:text-blue-600 hover:border-blue-700"
      >
        Buy
      </a>
      <p className="font-normal text-white text-xl">From $199/month or $999</p>
    </div>
  </section>
  )  
}

export default Hero
