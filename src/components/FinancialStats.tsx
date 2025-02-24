import { FC, useEffect, useState } from 'react';
import { getFinancialStats } from '../api/memberApi';
import type { FinancialHealthStats } from '../types/financialStats';
import ApiDetails from './ApiDetails';

interface FinancialStatsProps {
  uuid: string;
}

const DataRow: FC<{ field: string; type: string; value: any; description?: string }> = ({
  field,
  type,
  value,
  description
}) => (
  <div className="grid grid-cols-12 gap-2 py-1 border-b border-slate-100 hover:bg-slate-50">
    <div className="col-span-4 text-slate-400 font-mono text-xs">{field}</div>
    <div className="col-span-2 text-slate-500 font-mono text-xs">{type}</div>
    <div className="col-span-6 text-slate-600 font-mono text-xs flex justify-between">
      <span>{value?.toString() || 'null'}</span>
      {description && (
        <span className="text-slate-400 italic">{description}</span>
      )}
    </div>
  </div>
);

const FinancialStats: FC<FinancialStatsProps> = ({ uuid }) => {
  const [stats, setStats] = useState<FinancialHealthStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getFinancialStats(uuid);
        setStats(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [uuid]);

  if (loading) return <div className="text-sm text-slate-500 animate-pulse">Loading financial stats...</div>;
  if (error) return <div className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>;
  if (!stats.length) return <div className="text-sm text-slate-500">No financial stats found</div>;

  const latestStats = stats[0];
  
  // Create ordered fields array with uuid first, then rest alphabetically
  const allFields = ['uuid', ...Object.keys(latestStats)
    .filter(field => field !== 'uuid')
    .sort()];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-700 pb-2">Financial Statistics</h2>
        <ApiDetails 
          endpoint="/rest/v1/financial_health_stats"
          query={`
SELECT *
FROM financial_health_stats
WHERE uuid = '${uuid}'
ORDER BY month DESC;`}
          params={{
            uuid: uuid,
            orderBy: {
              column: 'month',
              direction: 'desc'
            }
          }}
        />
      </div>
      <div className="border-b border-slate-200 mb-3"></div>
      <div className="mt-3">
        <div className="grid grid-cols-12 gap-2 py-1 border-b border-slate-200 text-xs font-semibold">
          <div className="col-span-4">Field</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-6">Value & Description</div>
        </div>
        {allFields.map(field => (
          <DataRow 
            key={field}
            field={field}
            type={typeof (latestStats as Record<string, unknown>)[field]}
            value={(latestStats as Record<string, unknown>)[field]}
            description={getFieldDescription(field)}
          />
        ))}
      </div>
    </div>
  );
};

// Helper function to provide descriptions for known fields
const getFieldDescription = (field: string): string => {
  const descriptions: Record<string, string> = {
    id: "Unique record identifier",
    uuid: "Member UUID",
    member_name: "Member's full name",
    month: "Reporting period",
    verascore: "Overall financial health score",
    verascore_health: "Health status indicator",
    factor_dti: "Debt-to-Income factor weight",
    dti_ratio: "Debt-to-Income ratio percentage",
    dti_health: "DTI health status",
    factor_cash_on_hand: "Cash on hand factor weight",
    cash_lr_ratio: "Cash liquidity ratio percentage",
    cash_lr_health: "Cash liquidity health status",
    factor_spending: "Spending factor weight",
    spending_cf_ratio: "Cash flow spending ratio",
    spending_cf_health: "Spending health status",
    factor_savings: "Savings factor weight",
    savings_s_ratio: "Savings ratio percentage",
    savings_s_health: "Savings health status",
    factor_debt: "Debt factor weight",
    debt_ratio: "Debt ratio percentage",
    debt_health: "Debt health status",
    factor_payment_history: "Payment history factor weight",
    payment_crossing: "Payment threshold crossing",
    payment_history_late_payment_factor: "Late payment impact factor",
    payment_history_health: "Payment history health status",
    gross_income: "Monthly gross income",
    minimum_debt_payments: "Required monthly debt payments",
    liquid_reserves: "Available liquid assets",
    monthly_expenses: "Total monthly expenses",
    money_in: "Total monthly income",
    money_leftover: "Disposable income",
    net_savings: "Net monthly savings",
    total_outstanding_adverse_debt: "Total problematic debt",
    actual_adverse_debt_payments: "Actual payments on adverse debt",
    age_of_most_recent_late_payment: "Days since last late payment",
    number_of_late_payments: "Count of late payments"
  };

  return descriptions[field] || "";
};

export default FinancialStats; 