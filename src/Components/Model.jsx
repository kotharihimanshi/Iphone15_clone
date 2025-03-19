import { useGSAP } from '@gsap/react'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ModelView from './ModelView'
import * as THREE from 'three'
import { yellowImg } from "../Utils";
import { View } from '@react-three/drei'
import { models, sizes } from '../Constants'
import { animatewithGsapTl } from '../Utils/animations'
import { animatewithGsap } from '../Utils/animations'
import { Canvas } from '@react-three/fiber'



const Model = () => {

    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
        img: yellowImg,
    })

    //camera control fro view

    const cameracontrolSmall = useRef()
    const cameracontrolLarge = useRef()


    //models
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    //rotation
    const [smallRotation, setsmallRotation] = useState(0)
    const [largeRotation, setlargeRotation] = useState(0)

    const tl = gsap.timeline()

    useEffect(() => {

        if (size === "large") {
            console.log("Animating to large");
            animatewithGsapTl(tl, small, "#view1", "#view2", smallRotation, {
                transform: "translateX(-100%)",
                duration: 2,
            });
        }

        if (size === "small") {
            console.log("Animating to small");
            animatewithGsapTl(tl, large, "#view2", "#view1", largeRotation, {
                transform: "translateX(0)",
                duration: 2,
            });
        }
    }, [size]);



    useGSAP(() => {
        animatewithGsap('#heading', {
            y: 0,
            opacity: 1
        })
    })


    return (
        <section className='sm:py-32 py-20 sm:px-10 px-5'>
            <div className='screen-max-width'>
                <h1 id='heading' className='text-gray-600 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20'>
                    Take a closer look.
                </h1>
                <div className='flex items-center flex-col mt-5'>
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative text-white'>
                        <ModelView 
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameracontrolSmall}
                            setRotationState={setsmallRotation}
                            item={model}
                            size={size}
                        />

                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameracontrolLarge}
                            setRotationState={setlargeRotation}
                            item={model}
                            size={size}
                        />

                        <canvas className='w-full h-full pointer-events-none'
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden'
                            }}
                            onClick={(e) => {
                                console.log('Canvas clicked', e);
                            }}
                        >
                            <View.Port />
                        </canvas>
                    </div>
                    <div className='mx-auto w-full text-white'>
                        <p className='text-sm font-light text-center mb-5'>
                            {model.title}
                        </p>
                        <div className='flex items-center justify-center'>
                            <ul className='flex items-center justify-center px-4 py-4 rounded-full bg-gray-800 backdrop-blur'>
                                {models.map((item, i) => (
                                    <li key={i} className='w-6 h-6 rounded-4xl mx-2 cursor-pointer'
                                        style={{ backgroundColor: item.color[0] }}
                                        onClick={() => setModel(item)} />
                                ))}
                            </ul>
                            <button className='flex items-center justify-center p-1 rounded-full bg-gray-800 backdrop-blur ml-3 gap-1'>
                                {sizes.map(({ label, value }) => (
                                    <span key={label} className='w-10 h-10 text-sm flex justify-center items-center bg-white text-black rounded-full transition-all'
                                        style={{
                                            backgroundColor: size === value
                                                ? 'white' : 'transparent',
                                            color: size === value ? 'black' : 'white'
                                        }}
                                        onClick={() => setSize(value)}>
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model






