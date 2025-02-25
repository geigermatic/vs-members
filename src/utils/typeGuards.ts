import { ScoreHistory, ScoreMetrics } from '../api/scoreData';

export const isScoreHistory = (obj: any): obj is ScoreHistory => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.uuid === 'string' &&
    typeof obj.month === 'string' &&
    typeof obj.verascore === 'number'
  );
};

export const isScoreMetrics = (obj: any): obj is ScoreMetrics => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.current_score === 'number' &&
    typeof obj.six_month_avg === 'number' &&
    typeof obj.twelve_month_avg === 'number' &&
    ['up', 'down', 'stable'].includes(obj.trend_direction) &&
    ['good', 'fair', 'poor'].includes(obj.health_status)
  );
}; 