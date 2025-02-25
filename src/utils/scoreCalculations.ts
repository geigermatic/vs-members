/**
 * Utility functions for score calculations and formatting
 */

import { ScoreHistory, ScoreMetrics } from '../api/scoreData';

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
  const current_score = scores[0]?.verascore || 0;
  const six_month_scores = scores.slice(0, 6);
  const twelve_month_scores = scores.slice(0, 12);

  return {
    current_score: roundScore(current_score),
    six_month_avg: calculateAverageScore(six_month_scores),
    twelve_month_avg: calculateAverageScore(twelve_month_scores),
    trend_direction: calculateTrendDirection(scores),
    health_status: getScoreHealth(current_score)
  };
};

/**
 * Calculates trend based on historical data
 */
export const calculateScoreTrend = (scores: ScoreHistory[]): number => {
  // Pure calculation logic here
  return roundScore(/* calculation */);
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
  return roundScore(/* calculation */);
};

/**
 * Calculates the historical score trend (12 months)
 */
export const calculateTwelveMonthTrend = (historicalScores: number[]): number => {
  // Implementation here
  return roundScore(/* calculation */);
};

// Add more calculation functions as needed 