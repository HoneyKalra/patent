import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { PatentContext } from "../context/PatentContextProvider";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { OpenAI } from "openai";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Bot from "./ChattingBot";
import "./style/Patentdetails.css";

const PatentDetails = () => {
  const { patentsData, selectedPatent, patentSelected } = useContext(
    PatentContext
  );
  const { patentId } = useParams();
  const [activeClaim, setActiveClaim] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceType, setVoiceType] = useState(null);
  const [enableChat, setEnableChat] = useState(false);

  useEffect(() => {
    patentSelected(patentId);
    //setSummary(false);
    setVoiceType(null);
  }, [patentId]);
  useEffect(() => {
    //setSummary(false);
    setVoiceType(null);
  }, [selectedPatent]);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 130) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowScrollButton(false);
  };
  const openChat = () => {
    setEnableChat(true);
  };
  const closeChat = () => {
    setEnableChat(false);
  };
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Store your API key in an environment variable
  });

  // const apiKey = process.env.REACT_APP_API_KEY;
  // let genAI;
  // let model;
  // if (apiKey !== undefined) {
  //   genAI = new GoogleGenerativeAI(`${apiKey}`);
  //   model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // }
  const speakSummary = (text, typeOfVoice) => {
    if (window.responsiveVoice) {
      const voiceList = window.responsiveVoice.getVoices();

      if (typeOfVoice === "Legal") {
        window.responsiveVoice.speak(text, voiceList[8].name);
      }
      if (typeOfVoice === "Business") {
        window.responsiveVoice.speak(text, voiceList[8].name);
      }
      if (typeOfVoice === "10th Grade") {
        window.responsiveVoice.speak(text, voiceList[8].name);
      }
    }
  };

  const generateSummary = async (claims, languageStyle) => {
    // setIsLoading(true);
    // setVoiceType(languageStyle);

    // const combinedClaims = claims.join("\n");
    // const prompt = `Analyze the following claims and provide a summary in ${languageStyle}:\n\n${combinedClaims}\n\nThe summary should concisely capture the essence of all claims combined, without being too large or too small. Do not include questions,summary in voice type and do not use special symbols. in the response. `;

    // try {
    //   const result = await model.generateContent(prompt);
    //   const generatedSummary =
    //     result.response.candidates[0].content.parts[0].text;
    //   //setSummary(generatedSummary);

    //   setIsLoading(false);
    //   speakSummary(generatedSummary, languageStyle);
    // } catch (error) {
    //   console.error("Error generating summary:", error);
    //   setIsLoading(false);
    // }

    //using chatgpt as ai response//
    setIsLoading(true);
    setVoiceType(languageStyle);

    const combinedClaims = claims.join("\n");
    const prompt = `Analyze the following claims and provide a summary in ${languageStyle}:\n\n${combinedClaims}\n\nThe summary should concisely capture the essence of all claims combined, without being too large or too small. Do not include questions,summary in voice type and do not use special symbols. in the response.`;

    try {
      openai.apiKey =
        "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";
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      alert(response.data.choices[0].text);

      const generatedSummary = response.choices[0].text.trim();

      setIsLoading(false);
      speakSummary(generatedSummary, languageStyle);
    } catch (error) {
      console.error("Error generating summary:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar
        choosenPatent={selectedPatent}
        activePatentId={patentId}
        showScrollButton={showScrollButton}
      />

      <div id="top" className="relative " data-aos="fade-up">
        <div className="bg-black py-20">
          <div className="flex-col mb-10 px-14">
            <p
              className=" sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center rounded-md text-white pb-3 font-roboto font-openfont"
              style={{ textShadow: "1px 0px 2px rgba(0,0,0,0.6)" }}
            >
              {selectedPatent?.title}
            </p>
            <p
              className="sm:text-lg md:text-xl  text-white text-center font-medium pb-8 font-openfont"
              style={{ textShadow: "1px 0px 2px rgba(0,0,0,0.6)" }}
            >
              {selectedPatent?.patentId}
            </p>
          </div>
        </div>
        <div className="relative right-0 left-0 w-[94%] px-5 mx-auto p-2 rounded-lg  bg-white lg:px-10">
          <div className="relative h-100vh w-full ">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-2 justify-between   font-semibold   my-4 sm:my-3 md:my-2 lg:my-4">
              <div className="flex  w-64 gap-4    items-center sm:justify-start lg:justify-center ">
                <span className="w-12 h-12  rounded-full text-center pl-3 pt-2.5 bg-white border border-black ">
                  <FaUserTie className="text-2xl font-extrabold " />
                </span>
                <div>
                  <p className="text-2xl">Inventor</p>
                  <p className="text-[0.8rem] text-[#3b4455]">
                    {selectedPatent?.inventor}
                  </p>
                </div>
              </div>

              <div className="flex  w-64 gap-4 items-center  sm:justify-start lg:justify-center ">
                <span className="w-12 h-12  rounded-full text-center pl-2 pt-2.5 bg-white border border-black ">
                  <svg
                    class="w-7 h-7"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"></path>
                  </svg>
                </span>
                <div>
                  <p className="text-2xl">Patent ID</p>
                  <p className="text-[0.8rem] text-[#3b4455]">
                    {selectedPatent?.patentId}
                  </p>
                </div>
              </div>

              <div className="flex  w-64 gap-4  items-center sm:py-2 sm:justify-start lg:justify-center ">
                <span className="w-12 h-12  rounded-full text-center pl-3 pt-2.5 bg-white border border-black ">
                  <BsCalendarDateFill className="text-2xl font-extrabold " />
                </span>
                <div>
                  <p className="text-2xl">File Date</p>
                  <p className="text-[0.8rem] text-[#3b4455]">
                    {selectedPatent?.fileDate}
                  </p>
                </div>
              </div>
              <div className="flex  w-64 gap-4  items-center sm:py-2 sm:justify-start lg:justify-center ">
                <span className="w-12 h-12  rounded-full text-center pl-3 pt-2.5 bg-white border border-black ">
                  <BsCalendarDateFill className="text-2xl font-extrabold " />
                </span>
                <div>
                  <p className="text-2xl">Issued Date</p>
                  <p className="text-[0.8rem] text-[#3b4455]">
                    {selectedPatent?.issued}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-3 text-[#00A4E5] pt-4 pb-8 font-openfont  text-start">
              Abstract
            </p>
            <p className="text-md sm:text-lg leading-relaxed text-[#3b4455] text-[12px] font-roboto">
              {selectedPatent.abstract}
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-3 text-[#00A4E5] py-8 font-openfont">
              Field Of Inventor
            </p>
            <p className="text-md sm:text-lg leading-relaxed text-[#3b4455] text-[12px] font-roboto">
              {selectedPatent.fieldOfInventor}
            </p>
            <p className="text-2xl  md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-3 text-[#00A4E5] py-8 font-openfont">
              Claims
            </p>
          </div>
          <div className="pb-36 lg:pb-10">
            {selectedPatent?.claims?.map((claim, index) => (
              <div key={index} className="mb-4 ">
                <button
                  className={`${
                    activeClaim === index ? "" : ""
                  }sm:px-2 w-full text-left font-semibold text-[#3b4455] text-lg  py-0 rounded-lg    flex justify-between`}
                ></button>
                {
                  <div className=" pt-2  text-md sm:text-lg leading-relaxed text-[#3b4455] text-[12px] font-roboto">
                    {claim}
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" bg-green-500 w-full">
        {showScrollButton && (
          <button
            className="fixed bottom-5  py-2 px-2 right-2 sm:py-2 sm-px-2 md:right-3 md:bottom-20 md:px-3 md:py-3 md:text-2xl  text-xl z-10 cursor-pointer hover:bg-[#00000098] bg-[#00000068] text-white rounded-full lg:bottom-2 lg:right-4 "
            onClick={scrollToTop}
          >
            <FaArrowUp />
          </button>
        )}
      </div>
      {enableChat && <Bot closeChat={closeChat} />}
      <button
        className="fixed bottom-20 right-2  py-2 px-2 sm:right-2 sm:py-2 sm-px-2 md:right-3 md:bottom-36 md:px-3 md:py-3 md:text-2xl  text-xl z-10 cursor-pointer hover:bg-[#00000098] bg-[#00000068] text-white rounded-full lg:bottom-16"
        onClick={openChat}
      >
        <svg
          class="w-5 h-5 md:w-8 md:h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          <path d="M8 12h.01"></path>
          <path d="M12 12h.01"></path>
          <path d="M16 12h.01"></path>
        </svg>
      </button>
      {showScrollButton && (
        <div className="flex fixed bottom-0  flex-col pt-5 w-9/10 ml-11  md:flex-row md:justify-around md:ml-1 md:w-full ">
          <buttton
            className="bg-[#3b4455] text-center font-bold cursor-pointer text-white  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => {
              window.responsiveVoice.cancel();
              generateSummary(selectedPatent?.claims, "Legal");
            }}
          >
            {isLoading && voiceType === "Legal" ? (
              <p className="px-12">
                <span class="w-3 h-3 border-2 border-t-transparent border-white rounded-full inline-block animate-spin mr-2"></span>
                <span>Loading Voice.....</span>
              </p>
            ) : (
              <p>Summary Of Claims in Legal Voice</p>
            )}
          </buttton>
          <buttton
            className="bg-[#3b4455] text-center text-white cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex flex-col md:flex-row"
            onClick={() => {
              generateSummary(selectedPatent?.claims, "Business");
            }}
          >
            {isLoading && voiceType === "Business" ? (
              <p className="px-12">
                <span class="w-3 h-3 border-2 border-t-transparent border-white rounded-full inline-block animate-spin mr-2"></span>
                <span>Loading Voice.....</span>
              </p>
            ) : (
              <p>Summary Of Claims in Business Voice</p>
            )}
          </buttton>
          <buttton
            className="bg-[#3b4455] text-center text-white cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => {
              generateSummary(selectedPatent?.claims, "10th Grade");
            }}
          >
            {isLoading && voiceType === "10th Grade" ? (
              <p className="px-12">
                <span class="w-3 h-3 border-2 border-t-transparent border-white rounded-full inline-block animate-spin mr-2"></span>
                <span>Loading Voice.....</span>
              </p>
            ) : (
              <p>Summary Of Claims in 10th Grade Voice</p>
            )}
          </buttton>
        </div>
      )}

      {/* {isLoading ? (
        <span className="flex justify-center items-center"></span>
      ) : (
        summary && (
          <div className="w-[94%] px-5 lg:px-20" key={selectedPatent?.patentId}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-3 text-[#00A4E5] py-8 font-openfont">
              Summary in {voiceType} Voice
            </h3>
            <p className="pt-2 text-md sm:text-lg leading-relaxed text-[#3b4455] text-[12px] font-roboto pb-5">
              {summary}
            </p>
          </div>
        )
      )} */}
    </>
  );
};

export default PatentDetails;
