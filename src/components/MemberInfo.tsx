import { FC } from 'react';
import type { Member } from '../types/member';

interface MemberInfoProps {
  member: Member | null;
}

const MemberInfo: FC<MemberInfoProps> = ({ member }) => {
  if (!member) return null;

  console.log('Member data:', member);

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Dashboard Ready':
        return 'bg-green-100 text-green-700';
      case 'Needs Attention':
        return 'bg-red-100 text-red-700';
      case 'Awaiting Dashboard':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Email Not Confirmed':
        return 'bg-orange-100 text-orange-700';
      case 'In Progress':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-3 text-xs">
      <div className="text-slate-700 font-semibold">{member.member_name}</div>
      <div className="text-slate-500 mt-1">
        {member.first_name} {member.last_name}
      </div>
      <div className="text-slate-500">{member.email}</div>
      <div className="mt-2">
        <span className={`inline-block px-2 py-1 rounded font-medium ${getStatusColor(member.dashboard_status)}`}>
          Dashboard Status: {member.dashboard_status || 'Not Set'}
        </span>
      </div>
    </div>
  );
};

export default MemberInfo; 