import { FC } from 'react';

// Mock user data - replace with actual auth data later
const USER = {
  email: 'username@example.org',
  avatar: 'https://via.placeholder.com/32'
};

const Header: FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left section: Logo and Title */}
        <div className="flex items-center space-x-4">
          {/* Logo placeholder - replace with actual logo */}
          <div className="text-blue-600 font-bold text-xl">
            LaborScore
          </div>
          
          <div className="hidden md:block h-6 w-px bg-slate-200" />
          
          <h1 className="hidden md:block text-slate-600 font-medium">
            Labor Credit Union Members
          </h1>
        </div>

        {/* Right section: User info and VeraScore badge */}
        <div className="flex items-center space-x-6">
          {/* VeraScore badge */}
          <div className="hidden md:flex items-center px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600">
            Powered by VeraScore
          </div>

          {/* User section */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-sm text-slate-600">
              Welcome, {USER.email}
            </div>
            
            {/* User menu dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => {/* Add dropdown toggle logic */}}
              >
                <img 
                  src={USER.avatar} 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
                <svg 
                  className="w-4 h-4 text-slate-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu - hidden by default */}
              <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-sm text-slate-700">
                <a href="#profile" className="block px-4 py-2 hover:bg-slate-50">
                  Profile Settings
                </a>
                <a href="#logout" className="block px-4 py-2 hover:bg-slate-50">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 