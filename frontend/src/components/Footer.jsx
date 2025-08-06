const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="container mx-auto px-6">
        <div className="mt-1 text-center text-sm">
          &copy; {new Date().getFullYear()} RentMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;