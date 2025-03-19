import React, { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../Constants';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../Utils';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from "gsap/ScrollTrigger"; // Import ScrollTrigger from gsap directly

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpan = useRef([]);
    const videoDiv = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isPlaying: false,
        isLastvideo: false
    });

    const [loadedData, setLoadedData] = useState([]);

    const { isEnd, startPlay, videoId, isPlaying, isLastvideo } = video;

    useGSAP(() => {

        gsap.to('#slider' , {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut',
            
        })

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo(prevVideo => ({
                    ...prevVideo,
                    startPlay: true,
                    isPlaying: true
                }));
            }
        });
    }, [isEnd, videoId]);

    useEffect(() => {
        let CurrentProgress = 0;
        let span = videoSpan.current;

        if (span[videoId]) {
            let animate = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(animate.progress() * 100);

                    if (progress !== CurrentProgress) {
                        CurrentProgress = progress;

                        gsap.to(videoDiv.current[videoId], {
                            width: 
                              window.innerWidth < 760
                                ? '10vw'
                                : window.innerWidth < 1200
                                ? '10vw'
                                : '4vw'
                        });

                        gsap.to(span[videoId], {
                            width: `${CurrentProgress}%`,
                            backgroundColor: 'white'
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDiv.current[videoId], {
                            width: '12px'
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        });
                    }
                }
            });

            if (videoId === 0) {
                animate.restart();
            }

            const animupdates = () => {
                animate.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
            };

            if (isPlaying) {
                gsap.ticker.add(animupdates);
            } else {
                gsap.ticker.remove(animupdates);
            }
        }
    }, [videoId, startPlay]);

    // useEffect(() => {
    //     if (loadedData.length > 3) {
    //         if (!isPlaying) {
    //             videoRef.current[videoId].pause();
    //         } else {
    //             startPlay && videoRef.current[videoId].play();
    //         }
    //     }
    // }, [startPlay, videoId, isPlaying, loadedData]);


    useEffect(() => {
        if (videoRef.current[videoId]) {
            if (isPlaying) {
                videoRef.current[videoId].play();
            } else {
                videoRef.current[videoId].pause();
            }
        }
    }, [isPlaying, videoId]);

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo(prevVideo => ({
                    ...prevVideo,
                    isEnd: true,
                    videoId: i + 1,
                }));
                break;
            case 'video-last':
                setVideo(prevVideo => ({
                    ...prevVideo,
                    isLastvideo: true,
                }));
                break;
            case 'video-reset':
                setVideo(prevVideo => ({
                    ...prevVideo,
                    isLastvideo: false,
                    videoId: 0,
                }));
                break;
                case 'pause':
                setVideo(prevVideo => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying
                }));
                break;
                case 'play':
                setVideo(prevVideo => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying
                }));
                break;
            default:
                break;
        }
    };

    const handleMetadata = (i, e) => {
        setLoadedData(prevData => [...prevData, e]);
    };

    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className='sm:pr-20 pr-10'>
                        <div className='relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]'>
                            <div className='w-full h-full rounded-3xl flex items-center justify-center bg-black text-white overflow-hidden'>
                                <video
                                    id= 'video'
                                    preload='auto'
                                    muted
                                    className={`${
                                        list.id === 2 && 'translate-x-44'}
                                        pointer-events-none
                                    `}
                                    playsInline
                                    ref={el => (videoRef.current[i] = el)}
                                    onEnded={() => {
                                        i !== 3
                                            ? handleProcess('video-end', i)
                                            : handleProcess('video-last');
                                    }}
                                    onPlay={() => {
                                        setVideo(prevVideo => ({
                                            ...prevVideo,
                                            isPlaying: true,
                                            startPlay: true
                                        }));
                                    }}
                                    onLoadedMetadata={e => {
                                        handleMetadata(i, e);
                                    }}>
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10 text-white'>
                                {list.textLists.map(text => (
                                    <p key={text} className='md:text-2xl text-xl font-medium'>{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative flex items-center justify-center mt-10'>
                <div className='flex items-center justify-center py-5 px-7 bg-gray-600 backdrop-blur-2xl rounded-full'>
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            ref={el => (videoDiv.current[i] = el)}
                            className='mx-2 w-3 h-3 bg-gray-300 rounded-full relative cursor-pointer'>
                            <span className='absolute h-full w-full rounded-full' ref={el => (videoSpan.current[i] = el)} />
                        </span>
                    ))}
                </div>
                <button
                    className='ml-4 p-4 rounded-full bg-gray-600 backdrop-blur flex items-center justify-center'
                    >
                    <img
                        src={isLastvideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastvideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={() =>
                        isLastvideo
                            ? handleProcess('video-reset')
                            : !isPlaying
                                ? handleProcess('play')
                                : handleProcess('pause')
                    }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;
