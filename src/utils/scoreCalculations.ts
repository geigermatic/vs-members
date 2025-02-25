/**
 * Utility functions for score calculations and formatting
 */

import { ScoreHistory, getHistoricalScores } from '../api/scoreData';
import type { FinancialHealthStats } from '../types/financialStats';

/**
 * Rounds a score to the nearest whole number
 */
export const roundScore = (score: number): number => {
  return Math.round(score);
};

/**
 * Calculates the average score over a period
 */
export const calculateAverageScore = (scores: ScoreHistory[]): number => {
  if (!scores.length) return 0;
  const sum = scores.reduce((acc, score) => acc + score.verascore, 0);
  return roundScore(sum / scores.length);
};

/**
 * Determines score trend direction
 */
export const calculateTrendDirection = (
  scores: ScoreHistory[]
): 'up' | 'down' | 'stable' => {
  if (scores.length < 2) return 'stable';
  
  const recent = scores[0].verascore;
  const previous = scores[1].verascore;
  const difference = recent - previous;
  
  if (Math.abs(difference) < 5) return 'stable';
  return difference > 0 ? 'up' : 'down';
};

/**
 * Determines score health status
 */
export const getScoreHealth = (score: number): 'good' | 'fair' | 'poor' => {
  if (score >= 80) return 'good';
  if (score >= 60) return 'fair';
  return 'poor';
};

/**
 * Calculates all score metrics
 */
export const calculateScoreMetrics = (scores: ScoreHistory[]): ScoreMetrics => {
  if (!scores.length) {
    return {
      current_score: 0,
      six_month_avg: 0,
      twelve_month_avg: 0,
      trend_direction: 'stable',
      health_status: 'poor'
    };
  }

  // Current score is just the verascore from most recent month
  const current_score = roundScore(scores[0].verascore);

  // Calculate weighted averages for 6 and 12 months
  const six_month_scores = scores.slice(0, 6);
  const twelve_month_scores = scores.slice(0, 12);

  const six_month_avg = roundScore(
    six_month_scores.reduce((sum, score) => {
      return sum + (
        (score.factor_dti * 0.20) +
        (score.factor_cash_on_hand * 0.25) +
        (score.factor_spending * 0.20) +
        (score.factor_savings * 0.15) +
        (score.factor_debt * 0.05) +
        (score.factor_payment_history * 0.15)
      );
    }, 0) / six_month_scores.length
  );

  const twelve_month_avg = roundScore(
    twelve_month_scores.reduce((sum, score) => {
      return sum + (
        (score.factor_dti * 0.20) +
        (score.factor_cash_on_hand * 0.25) +
        (score.factor_spending * 0.20) +
        (score.factor_savings * 0.15) +
        (score.factor_debt * 0.05) +
        (score.factor_payment_history * 0.15)
      );
    }, 0) / twelve_month_scores.length
  );

  return {
    current_score,
    six_month_avg,
    twelve_month_avg,
    trend_direction: calculateTrendDirection(scores),
    health_status: getScoreHealth(current_score)
  };
};

/**
 * Calculates trend based on historical data
 */
export const calculateScoreTrend = (scores: ScoreHistory[]): number => {
  // Pure calculation logic here
  return roundScore(0); // Replace 0 with actual calculation
};

/**
 * Higher-level function that fetches data and calculates trend
 */
export const getScoreTrendWithData = async (
  uuid: string, 
  months: number
): Promise<number> => {
  const historicalData = await getHistoricalScores(uuid, months);
  return calculateScoreTrend(historicalData);
};

/**
 * Calculates the historical score trend (6 months)
 */
export const calculateSixMonthTrend = (historicalScores: number[]): number => {
  // Implementation here
  return roundScore(0); // Replace 0 with actual calculation
};

/**
 * Calculates the historical score trend (12 months)
 */
export const calculateTwelveMonthTrend = (historicalScores: number[]): number => {
  // Implementation here
  return roundScore(0); // Replace 0 with actual calculation
};

interface WeightedFactors {
  factor_dti: number;
  factor_cash_on_hand: number;
  factor_spending: number;
  factor_savings: number;
  factor_debt: number;
  factor_payment_history: number;
}

const FACTOR_WEIGHTS: WeightedFactors = {
  factor_dti: 0.20,
  factor_cash_on_hand: 0.25,
  factor_spending: 0.20,
  factor_savings: 0.15,
  factor_debt: 0.05,
  factor_payment_history: 0.15
};

export const calculateWeightedScore = (stats: FinancialHealthStats[]): number => {
  if (!stats.length) return 0;

  return stats.reduce((sum, stat) => {
    const weightedSum = 
      (stat.factor_dti * FACTOR_WEIGHTS.factor_dti) +
      (stat.factor_cash_on_hand * FACTOR_WEIGHTS.factor_cash_on_hand) +
      (stat.factor_spending * FACTOR_WEIGHTS.factor_spending) +
      (stat.factor_savings * FACTOR_WEIGHTS.factor_savings) +
      (stat.factor_debt * FACTOR_WEIGHTS.factor_debt) +
      (stat.factor_payment_history * FACTOR_WEIGHTS.factor_payment_history);
    
    return sum + weightedSum;
  }, 0) / stats.length;
};

export const calculateHistoricalScores = async (
  stats: FinancialHealthStats[]
): Promise<{ six_month_avg: number; twelve_month_avg: number }> => {
  // Sort by month descending to get most recent first
  const sortedStats = [...stats].sort((a, b) => 
    new Date(b.month).getTime() - new Date(a.month).getTime()
  );

  const sixMonthStats = sortedStats.slice(0, 6);
  const twelveMonthStats = sortedStats.slice(0, 12);

  return {
    six_month_avg: Math.round(calculateWeightedScore(sixMonthStats)),
    twelve_month_avg: Math.round(calculateWeightedScore(twelveMonthStats))
  };
};

// Add more calculation functions as needed 