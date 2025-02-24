import { FC, useEffect, useState } from 'react';
import { getAllMembers } from '../api/memberApi';
import type { Member } from '../types/member';

interface MemberSearchProps {
  onSelectMember: (member: Member) => void;
}

const MemberSearch: FC<MemberSearchProps> = ({ onSelectMember }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getAllMembers();
        setMembers(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  if (loading) return <div className="text-sm text-slate-500">Loading members...</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-md">
      <select 
        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        onChange={(e) => {
          const member = members.find(m => m.uuid === e.target.value);
          console.log('Selected member:', member);
          if (member) onSelectMember(member);
        }}
        defaultValue=""
      >
        <option value="" disabled>Select a member...</option>
        {members.map(member => (
          <option key={member.uuid} value={member.uuid}>
            {member.member_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MemberSearch; 