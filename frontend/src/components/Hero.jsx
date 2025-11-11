import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-10 md:px-20 py-16 gap-10 md:gap-16">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
          Find the <span className="text-[#4e54c8]">right space</span>,<br />
          with the <span className="text-[#4e54c8]">right face</span>.
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Discover roommates and rental spaces that match your lifestyle.
          RentMate makes finding a home seamless and social.
        </p>
        <Link
          to="/register"
          className="bg-[#4e54c8] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#5c6ac4] transition-transform transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>

      {/* Right Section (Image) */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/image.png"
          alt="Find Rooms"
          className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-auto object-contain"
        />
      </div>
    </main>
  );
};

export default Hero;
