import { FC } from 'react';

// Mock user data - replace with actual auth data later
const USER = {
  email: 'username@example.org',
  avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E'
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

          {/* Add Data Viewer Link */}
          <div className="hidden md:block h-6 w-px bg-slate-200" />
          
          <a 
            href="?view=data"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Data Viewer
          </a>
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
                  className="w-8 h-8 rounded-full bg-slate-200"
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