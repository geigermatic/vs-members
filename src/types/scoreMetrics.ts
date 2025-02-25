export interface ScoreMetrics {
  current_score: number;      // Direct verascore from most recent month
  six_month_avg: number;      // Weighted calculation from factors
  twelve_month_avg: number;   // Weighted calculation from factors
  trend_direction: 'up' | 'down' | 'stable';
  health_status: 'good' | 'fair' | 'poor';
} 