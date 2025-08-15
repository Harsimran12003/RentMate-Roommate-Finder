import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-3 md:px-10 shadow-md bg-white display: sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="RentMate Logo" className="w-60 h-10" />
        </div>
        <nav className="flex items-center gap-4 text-sm md:text-base">
          <Link to="/" className="hover:text-[#4e54c8] transition">Home</Link>
          <Link to="/about" className="hover:text-[#4e54c8] transition">About</Link>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-[#5c6ac4] transition">
            Login
          </Link>
        </nav>
      </header>
  )
}

export default Navbar;