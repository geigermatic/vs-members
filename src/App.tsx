import { FC, useState } from 'react';
import MemberSearch from './components/MemberSearch';
import MemberView from './components/MemberView';
import FinancialStats from './components/FinancialStats';

const App: FC = () => {
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-slate-700 mb-4 flex items-center">
          <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span>
          Supabase Data Viewer
        </h1>
        
        <div className="mb-4">
          <MemberSearch onSelectMember={setSelectedUuid} />
        </div>

        {selectedUuid && (
          <div className="space-y-4">
            <MemberView uuid={selectedUuid} />
            <FinancialStats uuid={selectedUuid} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 