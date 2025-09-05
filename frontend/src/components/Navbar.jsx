import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="favicon" className="w-10 h-10 rounded-md" />
          <img src="/logo.png" alt="RentMate Logo" className="h-10 object-contain" />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm md:text-base font-medium">
          <Link
            to="/"
            className="relative hover:text-[#4e54c8] transition group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#4e54c8] transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            className="relative hover:text-[#4e54c8] transition group"
          >
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#4e54c8] transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/login"
            className="bg-gradient-to-r from-[#4e54c8] to-[#5c6ac4] text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
