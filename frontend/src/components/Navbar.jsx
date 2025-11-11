import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="favicon" className="w-10 h-10 rounded-md" />
          <img src="/logo.png" alt="RentMate Logo" className="h-10 object-contain" />
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-[#4e54c8] transition">Home</Link>
          <Link to="/about" className="hover:text-[#4e54c8] transition">About</Link>
          <Link
            to="/login"
            className="bg-gradient-to-r from-[#4e54c8] to-[#5c6ac4] text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md pb-4 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-[#4e54c8]">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-[#4e54c8]">About</Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="bg-gradient-to-r from-[#4e54c8] to-[#5c6ac4] text-white px-4 py-2 rounded-lg shadow-md"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
