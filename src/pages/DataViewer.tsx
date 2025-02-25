import { FC, useState } from 'react';
import MemberSearch from '../components/MemberSearch';
import MemberInfo from '../components/MemberInfo';
import MemberView from '../components/MemberView';
import FinancialStats from '../components/FinancialStats';
import type { Member } from '../types/member';

export const DataViewer: FC = () => {
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-slate-700 mb-4 flex items-center">
          <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span>
          Supabase Data Viewer
        </h1>
        
        <div className="mb-4 flex gap-4 items-start">
          <div className="flex-1">
            <MemberSearch 
              onSelectMember={(member) => {
                setSelectedUuid(member.uuid);
                setSelectedMember(member);
              }} 
            />
          </div>
          <div className="w-80">
            <MemberInfo member={selectedMember} />
          </div>
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

export default DataViewer; 