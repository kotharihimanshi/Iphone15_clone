import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../Utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animatewithGsap } from '../Utils/animations'

const HowitWorks = () => {

    const videoRef = useRef();

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power2.inOut'
        })
        animatewithGsap('.g_fadeIn' , {
            opacity: 1,
            ease: 'power2.inOut',
            y: 0,
            duration: 1
        })
    })

    return (

        <section className="sm:py-32 py-20 sm:px-10 px-5">
            <div className="screen-max-width">
                {/* Chip Image */}
                <div id="chip" className="flex justify-center items-center w-full my-20">
                    <img src={chipImg} width={180} height={180} alt="chip" />
                </div>

                {/* Heading and Text */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-7xl font-semibold text-white">
                        A17 Pro chip.
                        <br />A monster win for gaming.
                    </h2>
                    <p className="text-gray-500 font-semibold text-xl md:text-2xl py-10">
                        It's here. The biggest redesign in the history of Apple GPUs.
                    </p>
                </div>

                {/* Video inside Frame */}
                <div className="mt-10 md:mt-20 mb-14 flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl aspect-[16/9] md:aspect-auto">
                        {/* Frame Image */}
                        <img
                            src={frameImg}
                            alt="frame"
                            className="relative z-10 w-full bg-transparent"
                        />

                        {/* Video inside the frame with rounded corners */}
                        <div className="absolute inset-0 justify-center items-center w-full h-full overflow-hidden rounded-[56px]">
                            <video
                                className="pointer-events-none absolute inset-0 w-full h-full sm:h-[85%] object-cover rounded-[56px] scale-[0.98]"
                                playsInline
                                preload="none"
                                muted
                                autoPlay
                                ref={videoRef}
                            >
                                <source src={frameVideo} type="video/mp4" />
                            </video>
                        </div>
                    </div>

                    <p className='text-gray-500 font-semibold flex text-center mt-3'>Honkai: Star Rail</p>
                    </div>
                    <div className=' flex md:flex-row flex-col justify-between items-start gap-24'>
                        <div className='flex-1 flex justify-center flex-col'>
                            <p className='text-gray-500 text-xl font-normal md:font-semibold opacity-0 translate-y-[100px] g_fadeIn'>
                                A17 Pro is an entirely new class of Iphone chip that delivers our {' '}
                                <span className='text-white'>
                                    best graphic performance by far  
                                </span>.
                            </p>
                        
                        <br />

                        <p className='text-gray-500 text-xl font-normal md:font-semibold opacity-0 translate-y-[100px] g_fadeIn'>
                            Mobile {' '}
                            <span className='text-white'>
                                games will look so immersive
                            </span>,
                            with incredibly detailed environments and characters.
                        </p>
                        </div>

                    
                    <div className='flex flex-1 justify-center flex-col opacity-0 translate-y-[100px] g_fadeIn'> 
                      <p className='text-gray-500 text-xl font-normal md:font-semibold'>New</p>
                      <p className='text-white text-3xl md:text-5xl font-normal md:font-semibold my-2'>Pro-class GPU</p>
                      <p className='text-gray-500 text-xl font-normal md:font-semibold'>with 6 cores</p>
                    </div>
                </div>
           </div>
        </section>


    )
}

export default HowitWorks
