import React, { useState, useEffect } from 'react';
import { delay, motion } from 'framer-motion';
import galaxyVid from "../assets/videos/galaxy.mp4";

const letters = ['H', 'I', 'P', 'A', "I"];
const names = ['Patent 1', 'Patent 2', 'Patent 3', 'Patent 4', 'Patent 5'];
const tagLine = [{ title: "creativity", offset: 50 }, { title: "in", offset: 60 }, { title: "the", offset: 65 }, { title: "palm", offset: 73 }, { title: "of", offset: 80 }, { title: "your", offset: 87 }, { title: "hand", offset: 96 }];


const letterPositions = [
    { letter: 'H', x: -20, y: -10 },
    { letter: 'I', x: 28, y: -23 },
    { letter: 'P', x: 39, y: -28 },
    { letter: 'A', x: 33, y: 25 },
    { letter: 'I', x: 20, y: 45 },
];

const getHandPosition = (index, totalHands) => {
    const spread = 200;
    const x = (index - totalHands / 2) * spread;
    const y = 10;
    return { x, y };
};

const VideoBackground = () => {
    const [showHands, setShowHands] = useState([]);
    const [lettersEntered, setLettersEntered] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [horizontalTaglineVisible, setHorizontalTaglineVisible] = useState(false);

    useEffect(() => {
        const contentTimeout = setTimeout(() => {
            setShowContent(true);
        }, 15000);

        const taglineTimeout = setTimeout(() => {
            setHorizontalTaglineVisible(true);
        }, 15000);

        return () => {
            clearTimeout(contentTimeout);
            clearTimeout(taglineTimeout);
        };
    }, []);

    useEffect(() => {
        if (lettersEntered) {
            const interval = setInterval(() => {
                setShowHands((prev) => {
                    if (prev.length < names.length) {
                        return [...prev, names[prev.length]];
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 3500);

            return () => clearInterval(interval);
        }
    }, [lettersEntered]);

    const letterVariants = {
        initial: { opacity: 0, x: 0, y: 250, scale: 0 },
        animate: (index) => ({
            opacity: 1,
            scale: 1,
            x: letterPositions[index].x,
            y: letterPositions[index].y,
            transition: { delay: 7.5 + index * 2.1, duration: 5 }
        })
    };

    const circleVariants = {
        initial: { opacity: 0, y: 0, scale: 0 },
        animate: {
            opacity: 1,
            scale: 1,
            y: 50,
            transition: { delay: 2, duration: 3 }
        }
    };

    const moveCirclesVariants = {
        initial: { opacity: 0, y: -230, x: -80 },
        animate: {
            opacity: 1,
            y: -320,
            x: -100,
            transition: { delay: 10, duration: 5 }
        }
    };

    const horizontalTaglineVariant = {
        initial: {
            opacity: 1, y: -30, x: -340, scale: 1

        },
        animate: (index) => ({
            opacity: 0,
            y: -159,
            x: -300,
            transition: { delay: 2.5 + index * .1, duration: 1.8 },
        }),

    };

    const circularTagLineVariants = {
        initial: { opacity: 0, scale: 0, x: 0, y: 0 },
        animate: (index) => ({
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            transition: {
                delay: 17.5 + index * .1,
                duration: 2.1,
            }
        })
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video className="absolute top-[40%] left-[50%] w-auto transform -translate-x-1/2 -translate-y-1/2 h-auto min-w-full min-h-full object-cover" autoPlay muted loop>
                <source src={galaxyVid} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <motion.div
                initial="initial"
                animate="animate"
                variants={moveCirclesVariants}
                className="relative top-[50%] left-[50%] w-64 h-64 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={circleVariants}
                    className="absolute w-60 h-60 border-4 border-[#e7eaf6] rounded-full flex items-center justify-center"
                >
                </motion.div>
                <div className=' absolute w-52 h-52 top-24 '>
                    <svg viewBox="0 0 200 200 " className="">
                        <defs>
                            {tagLine.map((_, index) => (
                                <path
                                    key={index}
                                    id={`circlePath${index}`}
                                    d="M 100, 100 m 67, 13 a 55,25 0 1,0 -155,0 a 45,35 0 1,0 180,0"
                                />
                            ))}
                        </defs>
                        {tagLine.map((word, index) => (

                            <motion.text
                                key={word.title}
                                style={{ fill: 'black', fontStyle: 'italic', fontWeight: "bolder" }}
                                variants={circularTagLineVariants}
                                custom={index}
                                initial="initial"
                                animate="animate"
                            >
                                <textPath href={`#circlePath${index}`} startOffset={`${word.offset}%`} textAnchor="middle">
                                    {word.title}
                                </textPath>
                            </motion.text>
                        ))}
                    </svg>

                </div>

                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={circleVariants}
                    onClick={() => alert("alert ")}
                    className="absolute w-44 h-44 bg-[#e7eaf6] bg-opacity-70 rounded-full flex gap-8 items-center justify-center"
                >
                    {showContent && letters.map((letter, index) => (
                        <motion.p
                            key={`${letter}-${index}`}
                            custom={index}
                            initial="initial"
                            animate="animate"
                            variants={letterVariants}

                            onAnimationComplete={() => {
                                setLettersEntered(true);
                            }}
                            className={`absolute font-bokorRegular font-bold ${index === 0 ? `text-8xl leading-10 pl-4 pr-8 pt-6` : `text-6xl ${index === 2 && `text-2xl`}`} ${index === 3 && `text-6xl`}`}
                        >
                            {letter}
                        </motion.p>
                    ))}
                </motion.div>
            </motion.div>
            <motion.div
                initial="initial"
                animate={horizontalTaglineVisible ? "animate" : "initial"}
                className=" font-bokorRegular absolute top-[60%] left-[28%] flex items-center justify-center space-x-2 text-black w-full h-32 "
            >
                {horizontalTaglineVisible && tagLine.map((word, index) => (
                    <motion.div
                        key={word}
                        custom={index}
                        initial="initial"
                        animate="animate"
                        variants={horizontalTaglineVariant}
                        className="text-4xl mb-0 text-black "
                    >
                        {word.title}
                    </motion.div>
                ))}
            </motion.div>
            <div className="absolute top-[60%] left-[40%] flex items-center space-x-1">
                {showHands.map((name, index) => {
                    const { x, y } = getHandPosition(index, names.length);
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30, y: -150 }}
                            animate={{ opacity: 1, x, y }}
                            transition={{ duration: 2.9, delay: (index + 1) * 1.3 }}
                            className="flex flex-col items-center"
                            onClick={() => { alert("hello sumit") }}
                        >
                            <div className="text-2xl mb-0 text-[#e7eaf6]">{name}</div>
                            <svg className="w-42 h-16 text-[#ffff]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M559.7 392.2c17.8-13.1 21.6-38.1 8.5-55.9s-38.1-21.6-55.9-8.5L392.6 416H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288 272 193.7c-29.1 0-57.3 9.9-80 28L68.8 384H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H192 352.5c29 0 57.3-9.3 80.7-26.5l126.6-93.3zm-366.1-8.3a.5 .5 0 1 1 -.9 .2 .5 .5 0 1 1 .9-.2z"></path>
                            </svg>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default VideoBackground;
