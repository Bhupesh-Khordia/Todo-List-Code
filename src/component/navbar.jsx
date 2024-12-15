import React from "react";
import Logo from "./images/logo-removebg-preview.png";

const navbar = () => {
  return (
    <nav className="flex bg-gray-800 justify-end text-white text-lg p-7">
      {/* <img className='size-16 rounded-[50%] object-cover brightness-0 invert' src={Logo} alt="logo" /> */}
      <img
        className="absolute top-10 left-20 -translate-x-1/2 -translate-y-1/2 z-50 size-32 rounded-full object-cover brightness-0 invert"
        src={Logo}
        alt="logo"
      />
      <ul className="flex gap-14 px-4">
        <li className="cursor-pointer text-2xl">Home</li>
        <li className="cursor-pointer text-2xl">Task List</li>
      </ul>
    </nav>
  );
};

export default navbar;
