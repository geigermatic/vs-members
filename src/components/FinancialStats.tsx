import { FC, useEffect, useState } from 'react';
import { getFinancialStats } from '../api/memberApi';
import type { FinancialHealthStats } from '../types/financialStats';

const TEST_UUID = "dc922ded-d0a7-415a-9d4c-f1e8605fce92";

const FinancialStats: FC = () => {
  const [stats, setStats] = useState<FinancialHealthStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getFinancialStats(TEST_UUID);
        setStats(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading financial stats...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats.length) return <div>No financial stats found</div>;

  const latestStats = stats[0];

  return (
    <div>
      <h2>Financial Statistics</h2>
      <div>
        <h3>Latest Stats ({latestStats.month})</h3>
        <p>Verascore: {latestStats.verascore} ({latestStats.verascore_health})</p>
        <p>DTI Ratio: {latestStats.dti_ratio}% ({latestStats.dti_health})</p>
        <p>Cash Ratio: {latestStats.cash_lr_ratio}% ({latestStats.cash_lr_health})</p>
        <p>Savings Ratio: {latestStats.savings_s_ratio}% ({latestStats.savings_s_health})</p>
      </div>
    </div>
  );
};

export default FinancialStats; 