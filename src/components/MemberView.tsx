import { FC, useEffect, useState } from 'react';
import { getMemberData } from '../api/memberApi';
import type { Member } from '../types/member';

const TEST_UUID = "dc922ded-d0a7-415a-9d4c-f1e8605fce92";

const MemberView: FC = () => {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMember() {
      try {
        const data = await getMemberData(TEST_UUID);
        setMember(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, []);

  if (loading) return <div>Loading member data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!member) return <div>No member found</div>;

  return (
    <div>
      <h2>Member Details</h2>
      <div>
        <p>Name: {member.first_name} {member.last_name}</p>
        <p>Email: {member.email}</p>
        <p>Status: {member.dashboard_status}</p>
        <p>Member Since: {member.inst_member_since}</p>
      </div>
    </div>
  );
};

export default MemberView; 