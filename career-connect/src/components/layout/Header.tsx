import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Career Connect
      </Link>

      <nav className="space-x-4">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <a href="#" className="hover:text-blue-600">
          Categories
        </a>
        <a href="#" className="hover:text-blue-600">
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;
