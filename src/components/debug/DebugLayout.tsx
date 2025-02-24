import { FC, ReactNode, createContext, useContext, useState } from 'react';

// Create context for debug state
const DebugContext = createContext({
  showDebug: false,
  toggleDebug: () => {}
});

interface DebugSectionProps {
  children: ReactNode;
  label: string;
  className?: string;
}

// Individual debug section component
export const DebugSection: FC<DebugSectionProps> = ({ children, label, className = '' }) => {
  const { showDebug } = useContext(DebugContext);
  
  return (
    <div className={`relative ${showDebug ? 'debug-cell' : ''} ${className}`}>
      {showDebug && (
        <div className="debug-label">{label}</div>
      )}
      {children}
    </div>
  );
};

// Main debug layout component
interface DebugLayoutProps {
  children: ReactNode;
}

export const DebugLayout: FC<DebugLayoutProps> = ({ children }) => {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <DebugContext.Provider value={{ showDebug, toggleDebug: () => setShowDebug(!showDebug) }}>
      <div className={`relative ${showDebug ? 'debug-layout' : ''}`}>
        <button 
          onClick={() => setShowDebug(!showDebug)}
          className="absolute top-2 right-2 text-xs text-slate-400 hover:text-slate-600"
        >
          {showDebug ? '🔴 Debug' : '⚪ Debug'}
        </button>
        {children}
      </div>
    </DebugContext.Provider>
  );
}; 