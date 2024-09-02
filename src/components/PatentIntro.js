import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgVideo from "../assets/videos/galaxyvid.mp4";
import H_logo from "../assets/images/logoH.png";
import H_logoBlack from "../assets/images/H_logo - Copy.png";
import Hand from "../assets/images/white_hand.png";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import Aos from "aos";
import { Tooltip } from "react-tooltip";
import { PatentContext } from "../context/PatentContextProvider.js";
import themeAudio from "../assets/audio/theme.mp3";
import { GoUnmute } from "react-icons/go";
import { BiSolidVolumeMute } from "react-icons/bi";

import ZoomNotificationModal from "./Modal/Modal";
import { Modal } from "./Modal/Modal";

const PatentIntro = () => {
  //variables declaration //
  let substractXaxis = 0;
  let substractXaxis1 = 0;
  let substractXaxisMobile = 0;
  let addYaxis = 0;
  const tagLine = [
    { title: "creativity", offset: 51 },
    { title: "in", offset: 61.5 },
    { title: "the", offset: 66.3 },
    { title: "palm", offset: 73.9 },
    { title: "of", offset: 80.7 },
    { title: "your", offset: 87.3 },
    { title: "hand", offset: 96.2 },
  ];
  const { patentsData } = useContext(PatentContext);
  const [modalOpen, setModalOpen] = useState(true);

  const handleRequestPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Notifications enabled", {
          body: "You will now receive notifications!",
        });
      }
      setModalOpen(false);
    });
  };

  //states declaration//
  const [patenNumData, setpatenNumData] = useState(null);
  const [showPatent, setShowPatent] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [deviceType, setDeviceType] = useState("");
  const [showToolTip, setShowToolTip] = useState(true);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [initialX, setInitialX] = useState(-20);
  const [initialY, setInitialY] = useState(0);

  const [playMusic, setPlayMusic] = useState(() => {
    // localStorage  code here-----------------//
    const checkMusicPlay = localStorage.getItem("playMusic");
    return checkMusicPlay ? JSON.parse(checkMusicPlay) : false;
  });

  const [showModal, setShowModal] = useState(() => {
    const checkModal = localStorage.getItem("showModal");
    return checkModal ? JSON.parse(checkModal) : true;
  });

  const [animate, setAnimate] = useState(() => {
    const checkAnimation = localStorage.getItem("animate");
    return checkAnimation ? JSON.parse(checkAnimation) : true;
  });

  //functions code here //
  window.onbeforeunload = function () {
    localStorage.clear();
  };

  function sliceWithShortEnd(data, end, minWordLength = 3, maxWordLength = 4) {
    if (end >= data?.length) return data;

    let sliceEnd = end;
    let words = data?.slice(0, sliceEnd).split(" ");

    while (
      words?.length > 1 &&
      (words[words?.length - 1].length < minWordLength ||
        words[words?.length - 1].length > maxWordLength)
    ) {
      words.pop();
      sliceEnd = words?.join(" ").length;
    }

    return data?.slice(0, sliceEnd).trim();
  }

  const determineDeviceType = () => {
    if (window.innerWidth <= 480) {
      setDeviceType("mobile");
    } else if (window.innerWidth <= 885) {
      setDeviceType("tablet");
    } else if (window.innerWidth <= 1279) {
      setDeviceType("notebookPc");
    } else if (window.innerWidth < 1440) {
      setDeviceType("laptop");
    } else if (window.innerWidth <= 1720) {
      setDeviceType("desktop");
    } else if (window.innerWidth <= 1920) {
      setDeviceType("largeDevice");
    } else if (window.innerWidth <= 2560) {
      setDeviceType("extraLarge");
    } else {
      setDeviceType("2XL");
    }
  };

  const getYValue = () => {
    switch (deviceType) {
      case "mobile":
        return -225;
      case "tablet":
        return -320;
      case "notebookPc":
        return -135;
      case "laptop":
        return -110;
      case "desktop":
        return -130;
      case "largeDevice":
        return -150;
      case "extraLarge":
        return -250;

      default:
        return -280;
    }
  };

  const patentClickHandle = (id, index, isTooltipVisible) => {
    console.log(isTooltipVisible, id, index, "tooltip");
    setShowToolTip(isTooltipVisible);
    const chosenPatent = patentsData.find((patent) => patent.patentId === id);
    if (chosenPatent) {
      setSelectedPatent(chosenPatent);
      setpatenNumData(index + 1);
      setShowPatent(true);
    }
  };
  console.log(selectedPatent, "patent selected");
  const audioRef = useRef(null);

  const handleMuted = () => {
    setPlayMusic((prev) => !prev);
    audioPlayed ? audioRef.current.pause() : audioRef.current.play();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //effects code here //

  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 33000);
  }, []);

  useEffect(() => {
    localStorage.setItem("animate", JSON.stringify(animate));
    localStorage.setItem("playMusic", JSON.stringify(playMusic));
    localStorage.setItem("showModal", JSON.stringify(showModal));
  }, [animate]);
  useEffect(() => {
    const handleResize = () => {
      determineDeviceType();

      // Set initial x and y values based on device type
      switch (deviceType) {
        case "mobile":
          setInitialX(0);
          setInitialY(370);

          break;
        case "tablet":
          setInitialX(300);
          setInitialY(450);

          break;
        case "noteBookPc":
          break;

        default:
          setInitialX(900);
          setInitialY(120);
          break;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deviceType]);

  useEffect(() => {
    if (playMusic === true) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playMusic]);

  const handleStart = () => {
    setPlayMusic(true);

    setAudioPlayed(true);
    setShowModal(false);
    audioRef.current.play();
    localStorage.setItem("playMusic", JSON.stringify(playMusic));
  };

  const handleStop = () => {
    setPlayMusic(false);

    setShowModal(false);
    audioRef.current.pause();
    localStorage.setItem("playMusic", JSON.stringify(playMusic));
  };

  return (
    <>
      {console.log(deviceType)}
      <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
        <Modal
          handlePlayMusic={handleStart}
          handleStopMusic={handleStop}
          closeModal={closeModal}
          showModal={showModal}
          setShowModal={setShowModal}
          // isOpen={modalOpen}
          // onRequestPermission={handleRequestPermission}
          // onClose={() => setModalOpen(false)}
        />
        <video
          className="absolute top-0 left-0 w-full h-screen object-cover"
          autoPlay
          muted
          loop
        >
          <source src={bgVideo} type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
        </video>
        <audio
          ref={audioRef}
          controls
          autoplay
          loop
          style={{ display: "none" }}
        >
          <source src={themeAudio} type="audio/mp3" />
        </audio>
        `
        <button
          onClick={handleMuted}
          className="absolute bottom-5 right-5 bg-white z-50 px-2 py-2 rounded-full text-[20px]"
        >
          {playMusic ? <GoUnmute /> : <BiSolidVolumeMute />}
        </button>
        <motion.div
          className="relative h-full w-full flex items-center justify-center "
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            animate ? { delay: 1, duration: 2 } : { delay: 0, duration: 0 }
          }
        >
          <motion.div
            className="absolute flex items-center justify-center rounded-full "
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{
              y: getYValue(),
            }}
            transition={
              animate ? { delay: 4, duration: 2 } : { delay: 0, duration: 0 }
            }
          >
            <motion.div
              className="  absolute bg-[#dbdddc]  flex items-center justify-center rounded-full z-0 w-64 h-64  xl:w-72 xl:h-72 "
              initial={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
              style={{
                background: "rgba(255, 255, 255, 0.65)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <motion.div
                className="w-48 h-48 rounded-full bg-none flex  border-[3px] border-black items-center justify-center absolute xl:w-52 xl:h-52"
                initial={{ opacity: 1, y: 0 }}
                transition={{ delay: 5, duration: 2 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="  z-0 flex bg-purple-500 items-center justify-center relative"
            initial={{ opacity: 0, Y: 280, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, y: 170, scale: 1 }}
            transition={{ delay: 5.5, duration: 1 }}
          >
            <motion.div
              className="absolute z-0 flex items-center justify-center bottom-0 w-[500px]  "
              initial={
                animate
                  ? {
                      opacity: 1,
                      y: -40,
                      x: 0,
                      scale: 1,
                    }
                  : { opacity: 0 }
              }
              animate={{
                opacity: 0,
                x: 0,
                y:
                  deviceType === "mobile"
                    ? -260
                    : deviceType === "tablet"
                    ? -355
                    : deviceType === "laptop"
                    ? -145
                    : deviceType === "largeDevice"
                    ? -185
                    : deviceType === "extraLarge"
                    ? -285
                    : deviceType === "2XL"
                    ? -315
                    : deviceType === "notebookPc"
                    ? -170
                    : deviceType === "desktop"
                    ? -165
                    : 0,
                scale: 1,
              }}
              transition={{ delay: 8, duration: 1.5 }}
            >
              <p
                style={{
                  fill: "black",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                className=" font-oldEnglish  sm:text-3xl text-white  font-bold  [text-shadow:0_1px_0_rgb(0_0_0/_40%)] md:text-4xl  "
              >
                Creativity in the palm of your hand
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-[300px] h-[300px] absolute"
            initial={
              animate
                ? {
                    opacity: 0,

                    y:
                      deviceType === "mobile"
                        ? -220
                        : deviceType === "tablet"
                        ? -315
                        : deviceType === "laptop"
                        ? -105
                        : deviceType === "largeDevice"
                        ? -145
                        : deviceType === "extraLarge"
                        ? -245
                        : deviceType === "2XL"
                        ? -275
                        : deviceType === "notebookPc"
                        ? -130
                        : deviceType === "desktop"
                        ? -125
                        : 0,
                  }
                : {
                    opacity: 1,
                    y:
                      deviceType === "mobile"
                        ? -220
                        : deviceType === "tablet"
                        ? -315
                        : deviceType === "laptop"
                        ? -105
                        : deviceType === "largeDevice"
                        ? -145
                        : deviceType === "extraLarge"
                        ? -245
                        : deviceType === "2XL"
                        ? -275
                        : deviceType === "notebookPc"
                        ? -130
                        : deviceType === "desktop"
                        ? -125
                        : 0,
                  }
            }
            animate={{ opacity: 1 }}
            transition={
              animate ? { delay: 9, duration: 1 } : { delay: 0, duration: 0 }
            }
          >
            <motion.div
              className="absolute  z-0 "
              animate={{
                opacity: 1,
                rotate:
                  deviceType == "mobile" ||
                  deviceType === "tablet" ||
                  deviceType === "notebookPc"
                    ? 0
                    : 7,
                y:
                  deviceType === "mobile"
                    ? -250
                    : deviceType === "tablet"
                    ? -345
                    : deviceType === "laptop"
                    ? -120
                    : deviceType === "largeDevice"
                    ? -165
                    : deviceType === "extraLarge"
                    ? -260
                    : deviceType === "2XL"
                    ? -275
                    : deviceType === "notebookPc"
                    ? -160
                    : deviceType === "desktop"
                    ? -145
                    : 0,
              }}
              transition={
                animate ? { delay: 9, duration: 0 } : { delay: 0, duration: 0 }
              }
            >
              {deviceType === "mobile" ||
              deviceType === "tablet" ||
              deviceType === "notebookPc" ? (
                <svg viewBox="0 0 200 200" className="circle-text z-20">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 93, 114 m -75,0 a 75,75 0 1,0 163,0 a 75,75 0 1,0 -184,0"
                    />
                  </defs>
                  <text
                    style={{
                      fill: "black",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      fontFamily: "Old English Text MT",
                      fontSize: "20px",
                      zIndex: "0",
                    }}
                  >
                    <textPath href="#circlePath" className="font-oldEnglish ">
                      Creativity in the palm of your hand
                    </textPath>
                  </text>
                </svg>
              ) : (
                <svg viewBox="0 0 195 195" className="circle-text z-20 ">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 83.5, 108 m -70, 0 a 75,75 0 1,0 170,0 a 75,75 0 1,0 -160,0"
                    />
                  </defs>
                  <text
                    style={{
                      fill: "black",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      // fontSize: "22px",
                    }}
                  >
                    <textPath
                      href="#circlePath"
                      className="font-oldEnglish  text-[22px] "
                    >
                      Creativity in the palm of your hand
                    </textPath>
                  </text>
                </svg>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute  z-0 flex  font-extrabold font-tangerine"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 120 }}
            transition={{ delay: 14, duration: 1.5 }}
          >
            <motion.img
              src={H_logo}
              alt=""
              className="w-[120px] h-[120px] "
              initial={animate ? { opacity: 1, x: 0, y: 10 } : { opacity: 0 }}
              animate={{
                opacity: 0,
                x: -18,
                y:
                  deviceType === "mobile"
                    ? -258
                    : deviceType === "tablet"
                    ? -248
                    : deviceType === "laptop"
                    ? -128
                    : deviceType === "largeDevice"
                    ? -168
                    : deviceType === "extraLarge"
                    ? -128
                    : deviceType === "2XL"
                    ? -298
                    : deviceType === "notebookPc"
                    ? -160
                    : deviceType === "desktop"
                    ? -148
                    : 0,
              }}
              transition={{ delay: 17, duration: 1 }}
            />
          </motion.div>
          <motion.div
            className="absolute w-32 h-32"
            initial={
              animate
                ? {
                    opacity: 0,
                    x: -30,
                    y:
                      deviceType === "mobile"
                        ? -220
                        : deviceType === "tablet"
                        ? -315
                        : deviceType === "laptop"
                        ? -105
                        : deviceType === "largeDevice"
                        ? -145
                        : deviceType === "extraLarge"
                        ? -245
                        : deviceType === "2XL"
                        ? -275
                        : deviceType === "notebookPc"
                        ? -130
                        : deviceType === "desktop"
                        ? -125
                        : 0,
                  }
                : {
                    opacity: 1,
                    x: -30,
                    y:
                      deviceType === "mobile"
                        ? -215
                        : deviceType === "tablet"
                        ? -315
                        : deviceType === "laptop"
                        ? -115
                        : deviceType === "largeDevice"
                        ? -155
                        : deviceType === "extraLarge"
                        ? -245
                        : deviceType === "2XL"
                        ? -275
                        : deviceType === "notebookPc"
                        ? -140
                        : deviceType === "desktop"
                        ? -135
                        : 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            transition={
              animate ? { delay: 18, duration: 1.3 } : { delay: 0, duration: 0 }
            }
          >
            <motion.img
              src={H_logoBlack}
              alt="logo image of h"
              className="absolute z-0  w-[140px] h-[140px] "
              animate={{
                opacity: 1,
                x: -5,
                y:
                  deviceType === "mobile"
                    ? -225
                    : deviceType === "tablet"
                    ? -315
                    : deviceType === "laptop"
                    ? -105
                    : deviceType === "largeDevice"
                    ? -145
                    : deviceType === "extraLarge"
                    ? -250
                    : deviceType === "2XL"
                    ? -165
                    : deviceType === "notebookPc"
                    ? -130
                    : deviceType === "desktop"
                    ? -125
                    : 0,
              }}
              transition={
                animate ? { delay: 18, duration: 0 } : { delay: 0, duration: 0 }
              }
            />
          </motion.div>

          <motion.div
            className="absolute  z-20 flex  font-extrabold font-cormorant text-white"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 150 }}
            transition={{ delay: 10, duration: 1 }}
          >
            <motion.p
              initial={
                animate
                  ? { opacity: 1, x: -30, y: -20, color: "white" }
                  : { opacity: 0 }
              }
              animate={{
                opacity: 0,
                x: 45,
                y:
                  deviceType === "mobile"
                    ? -343
                    : deviceType === "tablet"
                    ? -473
                    : deviceType === "laptop"
                    ? -245
                    : deviceType === "largeDevice"
                    ? -285
                    : deviceType === "extraLarge"
                    ? -385
                    : deviceType === "2XL"
                    ? -423
                    : deviceType === "notebookPc"
                    ? -275
                    : deviceType === "desktop"
                    ? -265
                    : 0,
              }}
              transition={{ delay: 12, duration: 2 }}
              className="text-2xl mx-1 font-bold text-[70px] rounded-full  "
            >
              I
            </motion.p>
          </motion.div>
          <motion.div
            initial={
              animate
                ? {
                    opacity: 0,
                    x: 35,
                    y:
                      deviceType === "mobile"
                        ? -235
                        : deviceType === "tablet"
                        ? -325
                        : deviceType === "laptop"
                        ? -125
                        : deviceType === "largeDevice"
                        ? -165
                        : deviceType === "extraLarge"
                        ? -260
                        : deviceType === "2XL"
                        ? -310
                        : deviceType === "notebookPc"
                        ? -150
                        : deviceType === "desktop"
                        ? -145
                        : 0,
                  }
                : {
                    opacity: 1,
                    x: 35,
                    y:
                      deviceType === "mobile"
                        ? -235
                        : deviceType === "tablet"
                        ? -325
                        : deviceType === "laptop"
                        ? -125
                        : deviceType === "largeDevice"
                        ? -165
                        : deviceType === "extraLarge"
                        ? -260
                        : deviceType === "2XL"
                        ? -310
                        : deviceType === "notebookPc"
                        ? -150
                        : deviceType === "desktop"
                        ? -145
                        : 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            transition={
              animate
                ? { delay: 13.6, duration: 1.1 }
                : { delay: 0, duration: 0 }
            }
          >
            <motion.p
              animate={{
                opacity: 1,
                x: -5,
                y:
                  deviceType === "mobile"
                    ? -260
                    : deviceType === "tablet"
                    ? -355
                    : deviceType === "laptop"
                    ? -150
                    : deviceType === "largeDevice"
                    ? -190
                    : deviceType === "extraLarge"
                    ? -285
                    : deviceType === "2XL"
                    ? -310
                    : deviceType === "notebookPc"
                    ? -175
                    : deviceType === "desktop"
                    ? -170
                    : 0,
              }}
              transition={
                animate
                  ? { delay: 13.6, duration: 0 }
                  : { delay: 0, duration: 0 }
              }
              className="text-2xl mx-1 font-bold text-[70px] rounded-full   z-40 text-black absolute font-cormorant"
            >
              I
            </motion.p>
          </motion.div>
          <motion.div
            initial={
              animate
                ? {
                    opacity: 0,
                    x: 47,
                    y:
                      deviceType === "mobile"
                        ? -220
                        : deviceType === "tablet"
                        ? -215
                        : deviceType === "laptop"
                        ? -132
                        : deviceType === "largeDevice"
                        ? -172
                        : deviceType === "extraLarge"
                        ? -245
                        : deviceType === "2XL"
                        ? -310
                        : deviceType === "notebookPc"
                        ? -157
                        : deviceType === "desktop"
                        ? -152
                        : 0,
                  }
                : {
                    opacity: 1,
                    x: 47,
                    y:
                      deviceType === "mobile"
                        ? -220
                        : deviceType === "tablet"
                        ? -215
                        : deviceType === "laptop"
                        ? -132
                        : deviceType === "largeDevice"
                        ? -172
                        : deviceType === "extraLarge"
                        ? -245
                        : deviceType === "2XL"
                        ? -310
                        : deviceType === "notebookPc"
                        ? -157
                        : deviceType === "desktop"
                        ? -152
                        : 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            transition={
              animate
                ? { delay: 13.6, duration: 1.1 }
                : { delay: 0, duration: 0 }
            }
          >
            <motion.p
              animate={{
                opacity: 1,
                x: -12,
                y:
                  deviceType === "mobile"
                    ? -260
                    : deviceType === "tablet"
                    ? -355
                    : deviceType === "laptop"
                    ? -150
                    : deviceType === "largeDevice"
                    ? -190
                    : deviceType === "extraLarge"
                    ? -285
                    : deviceType === "2XL"
                    ? -310
                    : deviceType === "notebookPc"
                    ? -175
                    : deviceType === "desktop"
                    ? -170
                    : 0,
              }}
              transition={
                animate
                  ? { delay: 13.6, duration: 0 }
                  : { delay: 0, duration: 0 }
              }
              className="text-2xl mx-1 font-bold text-[50px] rounded-full  z-40 text-black absolute"
            >
              P
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute  z-0 flex  font-extrabold font-tangerine"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 150 }}
            transition={{ delay: 10, duration: 1 }}
          >
            <motion.p
              initial={
                animate
                  ? { opacity: 1, x: 0, y: -20, color: "white" }
                  : { opacity: 0 }
              }
              animate={{
                opacity: 0,
                x: 50,
                y:
                  deviceType === "mobile"
                    ? -355
                    : deviceType === "tablet"
                    ? -455
                    : deviceType === "laptop"
                    ? -245
                    : deviceType === "largeDevice"
                    ? -285
                    : deviceType === "extraLarge"
                    ? -235
                    : deviceType === "2XL"
                    ? -405
                    : deviceType === "notebookPc"
                    ? -270
                    : deviceType === "desktop"
                    ? -265
                    : 0,
                color: "white",
              }}
              transition={{ delay: 12, duration: 1.9 }}
              className="text-2xl mx-1 font-bold text-[40px] rounded-full  "
            >
              P
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute  z-20 flex  font-extrabold font-FontA"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 150 }}
            transition={{ delay: 18, duration: 1 }}
          >
            <motion.p
              initial={
                animate
                  ? { opacity: 1, x: -40, y: -20, color: "white" }
                  : { opacity: 0 }
              }
              animate={{
                opacity: 0,
                x: 50,
                y:
                  deviceType === "mobile"
                    ? -340
                    : deviceType === "tablet"
                    ? -440
                    : deviceType === "laptop"
                    ? -230
                    : deviceType === "largeDevice"
                    ? -270
                    : deviceType === "extraLarge"
                    ? -220
                    : deviceType === "2XL"
                    ? -390
                    : deviceType === "notebookPc"
                    ? -265
                    : deviceType === "desktop"
                    ? -250
                    : 0,
              }}
              transition={{ delay: 20, duration: 1.5 }}
              className="text-2xl mx-1 font-bold text-[60px] rounded-full font-FontA font-cormorant"
            >
              A
            </motion.p>
          </motion.div>
          <motion.div
            initial={
              animate
                ? {
                    opacity: 0,
                    x: 48,
                    y:
                      deviceType === "mobile"
                        ? -160
                        : deviceType === "tablet"
                        ? -255
                        : deviceType === "laptop"
                        ? -110
                        : deviceType === "largeDevice"
                        ? -150
                        : deviceType === "extraLarge"
                        ? -230
                        : deviceType === "2XL"
                        ? -260
                        : deviceType === "notebookPc"
                        ? -135
                        : deviceType === "desktop"
                        ? -130
                        : 0,
                  }
                : {
                    opacity: 1,
                    x: 48,
                    y:
                      deviceType === "mobile"
                        ? -160
                        : deviceType === "tablet"
                        ? -255
                        : deviceType === "laptop"
                        ? -110
                        : deviceType === "largeDevice"
                        ? -160
                        : deviceType === "extraLarge"
                        ? -230
                        : deviceType === "2XL"
                        ? -260
                        : deviceType === "notebookPc"
                        ? -135
                        : deviceType === "desktop"
                        ? -130
                        : 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            transition={
              animate ? { delay: 21, duration: 1 } : { delay: 0, duration: 0 }
            }
          >
            <motion.p
              animate={{
                opacity: 1,
                x: -30,
                y:
                  deviceType === "mobile"
                    ? -210
                    : deviceType === "tablet"
                    ? -305
                    : deviceType === "laptop"
                    ? -100
                    : deviceType === "largeDevice"
                    ? -140
                    : deviceType === "extraLarge"
                    ? -235
                    : deviceType === "2XL"
                    ? -260
                    : deviceType === "notebookPc"
                    ? -125
                    : deviceType === "desktop"
                    ? -120
                    : 0,
              }}
              transition={
                animate ? { delay: 21, duration: 0 } : { delay: 0, duration: 0 }
              }
              className="text-2xl mx-1 font-bold text-[70px] rounded-full  z-40 text-black absolute font-cormorant"
            >
              A
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute  z-0 flex  font-extrabold font-FontA"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 150 }}
            transition={{ delay: 18, duration: 1 }}
          >
            <motion.p
              initial={
                animate
                  ? { opacity: 1, x: 0, y: -20, color: "white" }
                  : { opacity: 0 }
              }
              animate={{
                opacity: 0,
                x: 55,
                y:
                  deviceType === "mobile"
                    ? -340
                    : deviceType === "tablet"
                    ? -440
                    : deviceType === "laptop"
                    ? -220
                    : deviceType === "largeDevice"
                    ? -260
                    : deviceType === "extraLarge"
                    ? -220
                    : deviceType === "2XL"
                    ? -390
                    : deviceType === "notebookPc"
                    ? -245
                    : deviceType === "desktop"
                    ? -240
                    : 0,
              }}
              transition={{ delay: 20, duration: 1.5 }}
              className="text-2xl mx-1 font-bold text-[50px] rounded-full font-cormorant"
            >
              I
            </motion.p>
          </motion.div>
          <motion.div
            initial={
              animate
                ? {
                    opacity: 0,
                    x: 45,
                    y:
                      deviceType === "mobile"
                        ? -200
                        : deviceType === "tablet"
                        ? -295
                        : deviceType === "laptop"
                        ? -75
                        : deviceType === "largeDevice"
                        ? -115
                        : deviceType === "extraLarge"
                        ? -215
                        : deviceType === "2XL"
                        ? -245
                        : deviceType === "notebookPc"
                        ? -100
                        : deviceType === "desktop"
                        ? -95
                        : 0,
                  }
                : {
                    opacity: 1,
                    x: 45,
                    y:
                      deviceType === "mobile"
                        ? -200
                        : deviceType === "tablet"
                        ? -295
                        : deviceType === "laptop"
                        ? -75
                        : deviceType === "largeDevice"
                        ? -115
                        : deviceType === "extraLarge"
                        ? -215
                        : deviceType === "2XL"
                        ? -245
                        : deviceType === "notebookPc"
                        ? -100
                        : deviceType === "desktop"
                        ? -95
                        : 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            transition={
              animate ? { delay: 21, duration: 1 } : { delay: 0, duration: 0 }
            }
          >
            <motion.p
              animate={{
                opacity: 1,
                x: -12,
                y:
                  deviceType === "mobile"
                    ? -192
                    : deviceType === "tablet"
                    ? -287
                    : deviceType === "laptop"
                    ? -82
                    : deviceType === "largeDevice"
                    ? -122
                    : deviceType === "extraLarge"
                    ? -217
                    : deviceType === "2XL"
                    ? -245
                    : deviceType === "notebookPc"
                    ? -117
                    : deviceType === "desktop"
                    ? -102
                    : 0,
              }}
              transition={
                animate ? { delay: 21, duration: 0 } : { delay: 0, duration: 0 }
              }
              className="text-2xl mx-1 font-bold text-[40px] rounded-full  z-40 text-black absolute font-cormorant"
            >
              I
            </motion.p>
          </motion.div>

          <div className="absolute justify-center items-center left-1/2 transform -translate-x-1/2 text-center text-white flex flex-col  md:mt-32 xl:mt-8 2xl:mt-28 z-50">
            <div
              className={`${
                deviceType === "mobile"
                  ? `flex-col w-screen  justify-center ml-8`
                  : `flex  w-screen justify-around z-10 md:px-12 lg:pt-4`
              } z-40 `}
            >
              {patentsData.slice(0, 3).map((patent, index) => {
                substractXaxis += 450;
                substractXaxisMobile += 170;
                addYaxis += 70;

                return (
                  <motion.div
                    key={`${deviceType}-${patent.patentId}-${initialX}`}
                    className=" z-10 text-2xl mx-2 my-2   md:pb-12 flex justify-end items-center flex-col font-extrabold w-64 md:mr-6 "
                    initial={{
                      opacity: 0,
                      x:
                        deviceType === "mobile"
                          ? initialX
                          : deviceType === "tablet"
                          ? initialX - substractXaxisMobile
                          : initialX - substractXaxis,
                      y:
                        deviceType === "tablet" || deviceType === "mobile"
                          ? -initialY + 270 - addYaxis
                          : -100,
                    }}
                    animate={
                      deviceType === "mobile"
                        ? { opacity: 1, x: 0, y: 175 }
                        : deviceType === "laptop"
                        ? { opacity: 1, x: -80 + 50 * index, y: 173 }
                        : deviceType === "largeDevice"
                        ? { opacity: 1, x: 0, y: 250 }
                        : { opacity: 1, x: -80 + 50 * index, y: 200 }
                    }
                    transition={
                      animate === true
                        ? { delay: 22 + index * 1.5, duration: 2 }
                        : { delay: 0, duration: 0 }
                    }
                  >
                    <motion.div
                      className={
                        "cursor-pointer flex-col box-border leading-normal   w-[95%] ml-20    "
                      }
                    >
                      <a
                        className="z-10"
                        id="clickable"
                        onClick={() => {
                          patentClickHandle(patent.patentId, index, true);
                        }}
                      >
                        <p className="font-bold text-[12px] text-white  mb-[-5px]  ">
                          {patent.patentId} {patent.title}
                        </p>
                        <div className="flex justify-center items-center">
                          <img
                            src={Hand}
                            className={`${
                              deviceType === "mobile" ? "w-[80px]" : "w-[120px]"
                            }`}
                          ></img>
                        </div>
                      </a>

                      <Tooltip
                        style={{
                          width: `${
                            deviceType === "tablet" ? "220px" : "260px"
                          }`,
                          zIndex: "2000",
                          position: "absolute",
                          textAlign: "start",
                          wordSpacing: "4px",
                          lineHeight: "normal",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                        anchorSelect="#clickable"
                        content={
                          <>
                            <span>
                              {sliceWithShortEnd(selectedPatent?.abstract, 130)}
                            </span>
                            <Link
                              to={`/patent-details/${selectedPatent?.patentId}`}
                            >
                              &nbsp;
                              <button className="cursor-pointer rounded-lg text-blue-500 font-bolder text-lg ">
                                See More
                              </button>
                            </Link>
                          </>
                        }
                        events={["click"]} // Ensure this is set to 'click' for single-click activation
                        clickable
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex flex-col gap-9 sm:flex-row w-screen  sm:justify-center z-40 bg-green-700 h-0 ">
              {patentsData.slice(3, 5).map((patent, index) => {
                index = index + 3;

                substractXaxis1 += 250;
                return (
                  <motion.div
                    key={`${deviceType}-${patent.patentId}-${initialX}`}
                    className="text-2xl mx-2 mt-[-25px] pb-4   flex justify-end items-center flex-col w-[260px] "
                    initial={{
                      opacity: 0,
                      x:
                        deviceType === "mobile"
                          ? initialX
                          : deviceType === "tablet"
                          ? initialX - substractXaxis1
                          : 500 - substractXaxis1 - 100,
                      y: -initialY,
                    }}
                    animate={
                      deviceType === "mobile"
                        ? { opacity: 1, x: 10, y: 225 }
                        : deviceType === "tablet"
                        ? { opacity: 1, x: -45 + 5, y: 300 }
                        : deviceType === "laptop"
                        ? { opacity: 1, x: -97 + 137 * (index - 3), y: 193 }
                        : deviceType === "largeDevice"
                        ? { opacity: 1, x: -145 + 305 * (index - 3), y: 243 }
                        : deviceType === "notebookPc"
                        ? { opacity: 1, x: -60 + 50 * (index - 3), y: 193 }
                        : deviceType === "desktop"
                        ? { opacity: 1, x: -130 + 207 * (index - 3), y: 193 }
                        : { opacity: 1, x: -310 + 560 * (index - 3), y: 205 }
                    }
                    transition={
                      animate === true
                        ? { delay: 22 + (3 + index - 3) * 1.5, duration: 2 }
                        : { delay: 0, duration: 0 }
                    }
                  >
                    <Tooltip
                      style={{
                        width: `${deviceType === "tablet" ? "220px" : "260px"}`,

                        position: "absolute",
                        textAlign: "start",
                        wordSpacing: "4px",
                        lineHeight: "normal",
                        fontSize: "14px",
                        fontWeight: "normal",
                      }}
                      anchorSelect="#clickableTooltip"
                      events={["click"]}
                      content={
                        <div className="z-50 ">
                          <span>
                            {sliceWithShortEnd(selectedPatent?.abstract, 130)}
                          </span>

                          <Link
                            to={`/patent-details/${selectedPatent?.patentId}`}
                          >
                            &nbsp;
                            <button className=" cursor-pointer rounded-lg text-blue-500 font-bolder text-lg">
                              See More
                            </button>
                          </Link>
                        </div>
                      }
                      clickable
                    />

                    <motion.div
                      className={
                        "cursor-pointer flex-col box-border leading-normal   w-[95%] ml-20 mt-[-20px]   "
                      }
                    >
                      <div
                        id="clickableTooltip"
                        onClick={() => {
                          patentClickHandle(patent.patentId, index, true);
                        }}
                      >
                        <p className="font-bold text-[12px] text-white  mb-[-5px]  ">
                          {patent.patentId} {patent.title}
                        </p>
                        <div className="flex justify-center items-center">
                          <img
                            src={Hand}
                            className={`${
                              deviceType === "mobile" ? "w-[80px]" : "w-[120px]"
                            }`}
                          ></img>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PatentIntro;
