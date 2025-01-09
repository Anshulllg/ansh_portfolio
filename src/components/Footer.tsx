import React from 'react';

const Footer = () => {
  return (
    <div className="relative w-screen max-w-7xl mx-auto h-screen flex items-center justify-center">
      <div className="w-1/4">
        <img
          src="/img/Connect.png" 
          alt="Anshul"
          width={200}
          height={600}
        />
      </div>

      <div className="w-3/4">
        <p className="text-gray-300 text-6xl syne pt-30 pb-12">
          Let’s create something great together!
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-red-500 rounded-2xl hover:bg-red-800 transition-all">
          <span className="text-white syne-m">Say Hello</span>
        </button>
      </div>

      <p className="absolute bottom-[52px] text-sm syne-m text-white/50 w-full text-center">
        © 2025 Anshul Goswami
      </p>
    </div>
  );
};

export default Footer;
