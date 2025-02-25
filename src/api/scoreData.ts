import { supabase } from './supabaseClient';

/**
 * Data fetching functions for score-related queries
 */
export interface ScoreHistory {
  uuid: string;
  month: string;
  verascore: number;
  dti_ratio: number;
  cash_lr_ratio: number;
  spending_cf_ratio: number;
  savings_s_ratio: number;
  payment_history_late_payment_factor: number;
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
      dti_ratio,
      cash_lr_ratio,
      spending_cf_ratio,
      savings_s_ratio,
      payment_history_late_payment_factor
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