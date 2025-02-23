import { FC, useEffect, useState } from 'react';
import { getMemberData } from '../api/memberApi';
import type { Member } from '../types/member';
import ApiDetails from './ApiDetails';

interface MemberViewProps {
  uuid: string;
}

const TEST_UUID = "dc922ded-d0a7-415a-9d4c-f1e8605fce92";

const DataRow: FC<{ field: string; type: string; value: any; description?: string }> = ({
  field,
  type,
  value,
  description
}) => (
  <div className="grid grid-cols-12 gap-2 py-1 border-b border-slate-100 hover:bg-slate-50">
    <div className="col-span-3 text-slate-400 font-mono text-xs">{field}</div>
    <div className="col-span-2 text-slate-500 font-mono text-xs">{type}</div>
    <div className="col-span-7 text-slate-600 font-mono text-xs flex justify-between">
      <span>{value?.toString() || 'null'}</span>
      {description && (
        <span className="text-slate-400 italic">{description}</span>
      )}
    </div>
  </div>
);

const MemberView: FC<MemberViewProps> = ({ uuid }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMember() {
      try {
        const data = await getMemberData(uuid);
        setMember(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, [uuid]);

  if (loading) return <div className="text-sm text-slate-500 animate-pulse">Loading member data...</div>;
  if (error) return <div className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>;
  if (!member) return <div className="text-sm text-slate-500">No member found</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-700 pb-2">Member Details</h2>
        <ApiDetails 
          endpoint="/rest/v1/members"
          query={`
SELECT *
FROM members
WHERE uuid = '${uuid}'
LIMIT 1;`}
          params={{
            uuid: uuid
          }}
        />
      </div>
      <div className="border-b border-slate-200 mb-3"></div>
      <div className="mt-3">
        <div className="grid grid-cols-12 gap-2 py-1 border-b border-slate-200 text-xs font-semibold">
          <div className="col-span-3">Field</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-7">Value & Description</div>
        </div>
        <DataRow 
          field="uuid" 
          type="string" 
          value={member.uuid}
          description="Primary identifier"
        />
        <DataRow 
          field="member_name" 
          type="string" 
          value={member.member_name}
          description="Display name"
        />
        <DataRow 
          field="first_name" 
          type="string" 
          value={member.first_name}
        />
        <DataRow 
          field="last_name" 
          type="string" 
          value={member.last_name}
        />
        <DataRow 
          field="email" 
          type="string" 
          value={member.email}
        />
        <DataRow 
          field="dashboard_status" 
          type="string" 
          value={member.dashboard_status}
          description="Current member status"
        />
        <DataRow 
          field="inst_member_since" 
          type="date" 
          value={member.inst_member_since}
          description="Membership start date"
        />
        <DataRow 
          field="yearly_gross_income" 
          type="number" 
          value={member.yearly_gross_income}
          description="Annual income"
        />
      </div>
    </div>
  );
};

export default MemberView; 