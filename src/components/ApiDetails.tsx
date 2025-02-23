import { FC, useState } from 'react';

interface ApiDetailsProps {
  endpoint: string;
  query: string;
  params?: Record<string, any>;
}

const ApiDetails: FC<ApiDetailsProps> = ({ endpoint, query, params }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-2 text-xs border-t border-slate-100 pt-2">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 hover:text-blue-600 flex items-center"
      >
        <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
        <span className="ml-1">API Details</span>
      </button>
      
      {isExpanded && (
        <div className="mt-2 font-mono bg-slate-50 p-2 rounded">
          <div className="text-slate-500">Endpoint:</div>
          <div className="text-slate-700 break-all">{endpoint}</div>
          
          <div className="text-slate-500 mt-2">Query:</div>
          <div className="text-slate-700 whitespace-pre-wrap">{query}</div>
          
          {params && (
            <>
              <div className="text-slate-500 mt-2">Parameters:</div>
              <div className="text-slate-700">
                {JSON.stringify(params, null, 2)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiDetails; 