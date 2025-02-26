import { FC, useState, useEffect } from 'react';
import { getFinancialStats } from '../../api/memberApi';
import type { Member } from '../../types/member';
import type { FinancialHealthStats } from '../../types/financialStats';
import { DebugLayout, DebugSection } from '../debug/DebugLayout';
import { roundScore } from '../../utils/scoreCalculations';
import { getCurrentScore, getHistoricalScores } from '../../api/scoreData';
import { calculateScoreMetrics } from '../../utils/scoreCalculations';
import { validateScoreData } from '../../utils/scoreValidation';
import type { ScoreMetrics, ScoreHistory } from '../../api/scoreData';
import { useScoreData } from '../../hooks/useScoreData';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

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
  const { scoreMetrics, isLoading, error } = useScoreData(member.uuid);

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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <DebugLayout>
      <div className="bg-white rounded-lg shadow-sm px-3 pt-6 pb-3">
        {/* GRID 1: Header Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Section 1A: Now with internal grid */}
          <DebugSection 
            label="Section 1A: Name & Contact" 
            className="col-span-2"
          >
            {/* Internal grid for 1A */}
            <div className="grid grid-cols-2 gap-6">
              {/* Section 1A-1: Member Info */}
              <DebugSection 
                label="Section 1A-1: Member Info" 
                className="col-span-1"
              >
                <h3 className="text-[30px] font-semibold">
                  {member.first_name} {member.last_name}
                </h3>
                <div className="text-brand-link text-sm">{member.email} | {member.phone_number}</div>
              </DebugSection>

              {/* Section 1A-2: Tabs */}
              <DebugSection 
                label="Section 1A-2: Tabs" 
                className="col-span-1"
              >
                <div className="flex justify-end space-x-1">
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                      activeTab === 'summary'
                        ? 'text-brand-purple border-b-2 border-brand-purple'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                    onClick={() => setActiveTab('summary')}
                  >
                    Member Summary
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                      activeTab === 'details'
                        ? 'text-brand-purple border-b-2 border-brand-purple'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Factor Details
                  </button>
                </div>
              </DebugSection>
            </div>
          </DebugSection>

          {/* Section 1B: Member Since info */}
          <DebugSection 
            label="Section 1B" 
            className="col-span-1"
          >
            <div className="flex justify-end">
              <div className="text-sm text-slate-600">
                Member Since: {member.inst_member_since}
              </div>
            </div>
          </DebugSection>
        </div>

        {/* Spacing between grids */}
        <div className="h-6"></div>

        {/* GRID 2: Content Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Section 2A: Blue Score Panel */}
          <DebugSection 
            label="Section 2A: Blue Score Panel" 
            className="col-span-2"
          >
            <div className="bg-gradient-to-b from-brand-blue from-0% via-brand-blue via-75% to-brand-purple to-100% px-6 py-9 rounded-lg">
              <div className="flex gap-6">
                {/* Section 2A-1: Main Score */}
                <DebugSection 
                  label="Section 2A-1: Main Score" 
                  className="w-2/3"
                >
                  {/* Section 2A-1-1: Status Bar */}
                  <DebugSection 
                    label="Section 2A-1-1: Status Bar"
                    className="-mt-3 mb-6"
                  >
                    <div className="flex items-center text-white/90">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {member.dashboard_status}
                      </span>
                    </div>
                  </DebugSection>

                  {/* Section 2A-1-2: Score Display */}
                  <DebugSection 
                    label="Section 2A-1-2: Score Display"
                    className="mb-4 mt-9"
                  >
                    <div className="grid grid-cols-[160px_1fr] items-end gap-2">
                      {/* Score Number */}
                      <DebugSection label="Score Value">
                        <div className="text-7xl font-bold text-white text-right pr-[10%]">
                          {scoreMetrics?.current_score ?? '--'}
                        </div>
                      </DebugSection>

                      {/* Score Label */}
                      <DebugSection label="Score Label">
                        <div className="text-white font-bold tracking-[0.02em] text-[30px] leading-[41px]">
                          LaborScore
                        </div>
                      </DebugSection>
                    </div>
                  </DebugSection>
                    
                  {/* Section 2A-1-3: Progress Bar */}
                  <DebugSection 
                    label="Section 2A-1-3: Progress Bar"
                    className="mt-4 max-w-sm"
                  >
                    <div className="h-2 bg-black/20 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                        style={{ width: `${scoreMetrics?.current_score || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </DebugSection>
                </DebugSection>

                {/* Section 2A-2: Historical & Actions */}
                <DebugSection 
                  label="Section 2A-2: Historical & Actions" 
                  className="w-1/3"
                >
                  {/* Section 2A-2-1: Dashboard Status */}
                  <DebugSection 
                    label="Section 2A-2-1: Status" 
                    className="mb-6"
                  >
                    <div className="text-right">
                      {/* Reserved for future content */}
                    </div>
                  </DebugSection>

                  {/* Section 2A-2-2: Historical Scores */}
                  <DebugSection 
                    label="Section 2A-2-2: Historical" 
                    className="mb-8"
                  >
                    <div className="flex justify-between">
                      {/* 6 Month Score */}
                      <DebugSection label="6 Month" className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {scoreMetrics?.six_month_avg || '--'}
                        </div>
                        <div className="text-white/75 text-sm">last 6 months</div>
                      </DebugSection>

                      {/* 12 Month Score */}
                      <DebugSection label="12 Month" className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {scoreMetrics?.twelve_month_avg || '--'}
                        </div>
                        <div className="text-white/75 text-sm">last 12 months</div>
                      </DebugSection>
                    </div>
                  </DebugSection>

                  {/* Section 2A-2-3: Action Buttons */}
                  <DebugSection label="Section 2A-2-3: Actions">
                    <div className="space-y-7">
                      <button
                        onClick={onAssist}
                        className="w-full py-2 bg-brand-purple text-white font-medium rounded hover:bg-brand-purple/80 text-[13px]"
                      >
                        ASSIST MEMBER
                      </button>
                      <button
                        onClick={onEmail}
                        className="w-full py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 text-[13px]"
                      >
                        EMAIL MEMBER
                      </button>
                    </div>
                  </DebugSection>
                </DebugSection>
              </div>
            </div>
          </DebugSection>

          {/* Section 2B: Member Stats Panel */}
          <DebugSection 
            label="Section 2B: Member Stats" 
            className="col-span-1 flex items-center"
          >
            {/* Section 2B-2: Stats Grid */}
            <DebugSection 
              label="Section 2B-2: Stats Grid"
              className="w-full"
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Section 2B-2-1: Income */}
                <DebugSection label="Income">
                  <div>
                    <div className="text-slate-500">Yearly Gross Income</div>
                    <div className="text-2xl font-medium">
                      ${member.yearly_gross_income.toLocaleString()}
                    </div>
                  </div>
                </DebugSection>

                {/* Section 2B-2-2: Credit Score */}
                <DebugSection label="Credit">
                  <div>
                    <div className="text-slate-500">Credit Score</div>
                    <div className="text-2xl font-medium">620</div>
                  </div>
                </DebugSection>

                {/* Section 2B-2-3: VeraScore */}
                <DebugSection label="VeraScore">
                  <div>
                    <div className="text-slate-500">Latest VeraScore™</div>
                    <div className="text-xl font-medium">2023-12</div>
                  </div>
                </DebugSection>

                {/* Section 2B-2-4: View Financials */}
                <DebugSection label="Financials">
                  <div className="flex items-end">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      View Financials
                      <svg className={`w-5 h-5 transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </DebugSection>
              </div>
            </DebugSection>
          </DebugSection>
        </div>
      </div>
    </DebugLayout>
  );
};

export default MemberCard; 