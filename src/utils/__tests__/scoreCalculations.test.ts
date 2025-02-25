import { calculateScoreMetrics, roundScore, calculateTrendDirection } from '../scoreCalculations';
import { ScoreHistory } from '../../api/scoreData';

describe('Score Calculations', () => {
  describe('roundScore', () => {
    it('rounds numbers correctly', () => {
      expect(roundScore(75.4)).toBe(75);
      expect(roundScore(75.6)).toBe(76);
    });
  });

  describe('calculateTrendDirection', () => {
    it('returns stable for single score', () => {
      const scores: ScoreHistory[] = [
        { verascore: 75, month: '2024-01', /* ...other required fields */ }
      ];
      expect(calculateTrendDirection(scores)).toBe('stable');
    });

    it('detects upward trend', () => {
      const scores: ScoreHistory[] = [
        { verascore: 80, month: '2024-02' },
        { verascore: 70, month: '2024-01' }
      ];
      expect(calculateTrendDirection(scores)).toBe('up');
    });
  });
}); 