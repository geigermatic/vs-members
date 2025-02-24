import { FC } from 'react';
import type { FinancialHealthStats } from '../../types/financialStats';

interface VeraScoreTabProps {
  stats: FinancialHealthStats;
}

const VeraScoreTab: FC<VeraScoreTabProps> = ({ stats }) => {
  // Helper function to determine health status color
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Good': return 'text-green-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600">
          {stats.verascore}
        </div>
        <div className="text-sm text-slate-500">
          Overall VeraScore
        </div>
      </div>

      {/* Factors Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 rounded">
          <div className="text-sm font-medium text-slate-700">DTI Ratio</div>
          <div className={`text-lg font-medium ${getHealthColor(stats.dti_health)}`}>
            {stats.dti_ratio}%
          </div>
          <div className="text-xs text-slate-500">Factor: {stats.factor_dti}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded">
          <div className="text-sm font-medium text-slate-700">Cash on Hand</div>
          <div className={`text-lg font-medium ${getHealthColor(stats.cash_lr_health)}`}>
            {stats.cash_lr_ratio}%
          </div>
          <div className="text-xs text-slate-500">Factor: {stats.factor_cash_on_hand}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded">
          <div className="text-sm font-medium text-slate-700">Spending</div>
          <div className={`text-lg font-medium ${getHealthColor(stats.spending_cf_health)}`}>
            {stats.spending_cf_ratio}%
          </div>
          <div className="text-xs text-slate-500">Factor: {stats.factor_spending}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded">
          <div className="text-sm font-medium text-slate-700">Savings</div>
          <div className={`text-lg font-medium ${getHealthColor(stats.savings_s_health)}`}>
            {stats.savings_s_ratio}%
          </div>
          <div className="text-xs text-slate-500">Factor: {stats.factor_savings}</div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="border-t border-slate-200 pt-4 mt-4">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Additional Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Monthly Income</span>
            <span className="font-medium">${stats.money_in}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Monthly Expenses</span>
            <span className="font-medium">${stats.monthly_expenses}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Net Savings</span>
            <span className="font-medium">${stats.net_savings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeraScoreTab; 