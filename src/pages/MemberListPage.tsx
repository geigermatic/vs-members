import { FC, useState, useEffect } from 'react';
import { getAllMembers } from '../api/memberApi';  // Using existing API
import type { Member } from '../types/member';     // Using existing types

// Component imports (to be created)
import Header from '../components/dashboard/Header';
import MemberCard from '../components/dashboard/MemberCard';
import AssistModal from '../components/dashboard/AssistModal';
import EmailModal from '../components/dashboard/EmailModal';

// Types for modal state management
interface ModalState {
  isOpen: boolean;
  memberId?: string;
}

const MemberListPage: FC = () => {
  // Data state
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [assistModal, setAssistModal] = useState<ModalState>({ isOpen: false });
  const [emailModal, setEmailModal] = useState<ModalState>({ isOpen: false });

  // Fetch members using existing API
  useEffect(() => {
    async function loadMembers() {
      try {
        setLoading(true);
        const data = await getAllMembers();
        setMembers(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load members');
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  // Modal handlers
  const openAssistModal = (memberId: string) => 
    setAssistModal({ isOpen: true, memberId });
  const openEmailModal = (memberId: string) => 
    setEmailModal({ isOpen: true, memberId });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-pulse text-slate-500">Loading members...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Member List - Changed from grid to vertical stack */}
        {!loading && !error && (
          <div className="space-y-4"> {/* Changed from grid to vertical stack with spacing */}
            {members.map(member => (
              <MemberCard
                key={member.uuid}
                member={member}
                onAssist={() => openAssistModal(member.uuid)}
                onEmail={() => openEmailModal(member.uuid)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <AssistModal 
        isOpen={assistModal.isOpen}
        memberId={assistModal.memberId}
        onClose={() => setAssistModal({ isOpen: false })}
      />
      <EmailModal 
        isOpen={emailModal.isOpen}
        memberId={emailModal.memberId}
        onClose={() => setEmailModal({ isOpen: false })}
      />
    </div>
  );
};

export default MemberListPage; 