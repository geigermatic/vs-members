import { supabase } from './supabaseClient';

/**
 * Data fetching functions for score-related queries
 */
export interface ScoreHistory {
  uuid: string;
  month: string;
  verascore: number;
  factor_dti: number;
  factor_cash_on_hand: number;
  factor_spending: number;
  factor_savings: number;
  factor_debt: number;
  factor_payment_history: number;
}

export interface ScoreMetrics {
  current_score: number;
  six_month_avg: number;
  twelve_month_avg: number;
  trend_direction: 'up' | 'down' | 'stable';
  health_status: 'good' | 'fair' | 'poor';
}

/**
 * Fetches historical score data for a member
 */
export const getHistoricalScores = async (
  uuid: string, 
  months: number = 12
): Promise<ScoreHistory[]> => {
  const { data, error } = await supabase
    .from('financial_health_stats')
    .select(`
      uuid,
      month,
      verascore,
      factor_dti,
      factor_cash_on_hand,
      factor_spending,
      factor_savings,
      factor_debt,
      factor_payment_history
    `)
    .eq('uuid', uuid)
    .order('month', { ascending: false })
    .limit(months);

  if (error) throw error;
  return data;
};

/**
 * Fetches the most recent score data
 */
export const getCurrentScore = async (uuid: string): Promise<ScoreHistory> => {
  const { data, error } = await supabase
    .from('financial_health_stats')
    .select('*')
    .eq('uuid', uuid)
    .order('month', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};

// Other data fetching functions... 