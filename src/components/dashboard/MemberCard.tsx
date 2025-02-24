import { FC, useState, useEffect } from 'react';
import { getFinancialStats } from '../../api/memberApi';
import type { Member } from '../../types/member';
import type { FinancialHealthStats } from '../../types/financialStats';
import { DebugLayout, DebugSection } from '../debug/DebugLayout';

interface MemberCardProps {
  member: Member;
  onAssist: () => void;
  onEmail: () => void;
}

const MemberCard: FC<MemberCardProps> = ({ member, onAssist, onEmail }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [stats, setStats] = useState<FinancialHealthStats | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'details'>('summary');
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getFinancialStats(member.uuid);
        setStats(data[0]); // Get most recent stats
      } catch (e) {
        console.error('Failed to load financial stats:', e);
      }
    }
    fetchStats();
  }, [member.uuid]);

  return (
    <DebugLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* GRID 1: Header Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Section 1A: Now with internal grid */}
          <DebugSection 
            label="Section 1A: Name & Contact" 
            className="col-span-2"
          >
            {/* Internal grid for 1A */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left side: Member info */}
              <div>
                <h3 className="text-xl font-semibold">{member.member_name}</h3>
                <div className="text-blue-600 text-sm">{member.email} | {member.phone_number}</div>
              </div>

              {/* Right side: Tabs */}
              <div className="flex justify-end space-x-1">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                    activeTab === 'summary'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  onClick={() => setActiveTab('summary')}
                >
                  Summary
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                    activeTab === 'details'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
              </div>
            </div>
          </DebugSection>

          {/* Section 1B: Now empty since tabs moved */}
          <DebugSection 
            label="Section 1B" 
            className="col-span-1"
          >
            {/* This section is now available for other content */}
          </DebugSection>
        </div>

        {/* Spacing between grids */}
        <div className="h-6"></div>

        {/* GRID 2: Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Section 2A: Blue Score Panel (Left 2/3) */}
          <div className="col-span-2 bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg">
            <div className="flex gap-6">
              {/* Section 2A-1: Main Score (Left side of blue panel) */}
              <div className="w-2/3">
                {/* Status Bar */}
                <div className="flex items-center text-white/90 mb-6">
                  <span>Status:</span>
                  <span className="flex items-center gap-1 ml-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    {member.dashboard_status}
                  </span>
                  <span className="ml-4">Updated: {member.last_profile_edit}</span>
                </div>

                {/* Score and Progress Bar */}
                <div>
                  <div className="text-7xl font-bold text-white mb-1">
                    {stats?.verascore || '--'}
                  </div>
                  <div className="text-white/75">LaborScore</div>
                  
                  <div className="mt-4 max-w-sm">
                    <div className="h-2 bg-black/20 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                        style={{ width: `${stats?.verascore || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2A-2: Historical & Actions (Right side of blue panel) */}
              <div className="w-1/3">
                {/* Dashboard Status */}
                <div className="text-right mb-6">
                  <div className="inline-block px-3 py-1 bg-blue-800/50 rounded-full text-white/90 text-sm">
                    {member.dashboard_status}
                  </div>
                </div>

                {/* Historical Scores - Now in a row */}
                <div className="flex justify-between mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {stats?.last_6_months || '--'}
                    </div>
                    <div className="text-white/75 text-sm">last 6 months</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {stats?.last_12_months || '--'}
                    </div>
                    <div className="text-white/75 text-sm">last 12 months</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={onAssist}
                    className="w-full py-2 bg-purple-500 text-white font-medium rounded hover:bg-purple-600"
                  >
                    ASSIST MEMBER
                  </button>
                  <button
                    onClick={onEmail}
                    className="w-full py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                  >
                    EMAIL MEMBER
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2B: Member Stats Panel (Right 1/3) */}
          <div>
            {/* Member Info Header */}
            <div className="text-sm mb-6 text-right">
              <div className="text-slate-600">
                Member Since: {member.inst_member_since}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <div className="text-slate-500">Yearly Gross Income</div>
                <div className="text-2xl font-medium">
                  ${member.yearly_gross_income.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Credit Score</div>
                <div className="text-2xl font-medium">620</div>
              </div>
              <div>
                <div className="text-slate-500">Latest VeraScore™</div>
                <div className="text-xl font-medium">2023-12</div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  View Details
                  <svg className={`w-5 h-5 transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DebugLayout>
  );
};

export default MemberCard; 