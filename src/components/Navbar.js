

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo4.png';
import { PatentContext } from '../context/PatentContextProvider';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = ({ choosenPatent, activePatentId , showScrollButton}) => {
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { patentSelected, patentsData } = useContext(PatentContext);

  useEffect(() => {
    handlePatentClick(activePatentId);
  }, [activePatentId]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 130);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePatentClick = (patentId) => {
    setActive(patentId);
    patentSelected(patentId);
    setMenuOpen(false); // Close the menu when a patent is selected
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const cardStyle = {
    
  };
  

  return (
    <div className={ `w-full  transition-transform duration-300 ease-in-out z-20 ${scroll ?  'bg-[#393e46] z-20 fixed top-0 ' : 'bg-black '} md:px-5 lg:px-20 flex justify-between items-center`}>
      <Link to="/">
        <div className={`' ${scroll? "h-20" : "h-32"} relative  flex justify-center items-center py-2'`}>
          <img src={logo} alt="logo" className={` ${scroll ? "w-[4.3rem] sm:pl-0 pl-2": "w-[7.3rem] pl-2"} `} />
        </div>
      </Link>

      <div className='hidden lg:flex flex-wrap justify-center gap-4 2xl:gap-8 lg:text-[18px] md:text-[16px]'>
        {patentsData.map((item) => (
          <div 
            className='flex flex-col  items-center justify-center md:gap-2  sm:text-[0.8rem] lg:text-[1rem] font-semibold ' 
            key={item.Id}
          >
            <p 
              className={`cursor-pointer transition delay-300 duration-300 ease-in-out ${active === item.patentId ? `${scroll ? "text-[#00A4E5]" : "text-white border-b-2 border-white bg-custom-gradient py-2 px-4  transition delay-300 duration-300 ease-in-out"}` : `${scroll ? "text-white" : "text-white "}`}`} 
              onClick={() => handlePatentClick(item.patentId)}
            >
            {item.patentId}
            </p>
          </div>
        ))}
      </div>

      <div className='lg:hidden flex items-center'>
        <button onClick={toggleMenu} className='text-3xl mr-2'>
          {menuOpen ? <AiOutlineClose  className="text-white"/> : <AiOutlineMenu className="text-white"/>}
        </button>
      </div>

      {menuOpen && (
        <div className={` absolute  right-0 bg-gray-200 w-full   py-16  md:py-[4.5rem] flex gap-5 flex-col items-center justify-center z-50 lg:text-[20px] md:text-[16px] ${showScrollButton ? "top-20" : "top-32"}`}>
          {patentsData.map((item) => (
            <div 
              className='flex flex-col items-center justify-center gap-2 text-[15px] md:text-[16px] lg:text-[18px] font-semibold' 
              key={item.Id}
            >
              <p 
                className={`cursor-pointer bg-green ${active === item.patentId ? 'text-[#00A4E5] ' : 'text-black'}`} 
                onClick={() => handlePatentClick(item.patentId)}
              >
                {item.patentId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;