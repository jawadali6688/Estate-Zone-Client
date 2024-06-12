import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-gray-200 py-2 px-4 shadow-md shadow-gray-400 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          {/* <h1 className="font-bold flex flex-wrap gap-1 text-lg">
            <span className="text-blue-600">Estate</span>
            <span className="text-blue-900">Zone</span>
          </h1> */}
          <Logo/>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg hidden md:flex items-center ">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <div className="flex items-center sm:hidden">
          <button onClick={toggleSidebar}>
            <FaBars className="text-slate-700" />
          </button>
        </div>
        <ul className="hidden sm:flex gap-8 justify-center items-center">
          <Link to="/">
            <li className="text-gray-700 text-lg hover:text-blue-600 hover:underline hover:underline-offset-8  cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-gray-700 text-lg hover:text-blue-600 hover:underline hover:underline-offset-8  cursor-pointer">About</li>
          </Link>
          <Link to="/listings">
            <li className="text-gray-700 text-lg hover:text-blue-600 hover:underline hover:underline-offset-8  cursor-pointer">Listings</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full h-9 w-9 border-4 border-blue-600 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="text-lg py-2 rounded-lg bg-blue-600 px-4 text-white font-bold  cursor-pointer hover:bg-blue-700 duration-200">Login</li>
            )}
          </Link>
        </ul>
      </div>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleSidebar}>
          <div
            className="fixed left-0 top-0 bottom-0 w-64 bg-slate-200 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-bold text-xl">
                <span className="text-slate-500">Estate</span>
                <span className="text-slate-700">Zone</span>
              </h1>
              <button onClick={toggleSidebar}>
                <FaBars className="text-slate-700" />
              </button>
            </div>
            <ul className="flex flex-col gap-4">
              <Link to="/" onClick={toggleSidebar}>
                <li className="text-gray-500 text-lg  cursor-pointer">Home</li>
              </Link>
              <Link to="/about" onClick={toggleSidebar}>
                <li className="text-gray-500 text-lg  cursor-pointer">About</li>
              </Link>
              <Link to="/listings"
              
              onClick={toggleSidebar}>
                <li className="text-gray-500 text-lg  cursor-pointer">Listings</li>
              </Link>
              {/* <Link to="/privacy" onClick={toggleSidebar}>
                <li className="text-gray-500 text-lg  cursor-pointer">Privacy</li>
              </Link> */}
              <Link to="/profile" onClick={toggleSidebar}>
                {currentUser ? (
                  <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
                ) : (
                  <li className="text-gray-500 text-lg  cursor-pointer">Sign in</li>
                )}
              </Link>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
