import { ScoreHistory } from '../api/scoreData';

export class ScoreValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ScoreValidationError';
  }
}

export const validateScoreData = (scores: ScoreHistory[]): void => {
  if (!Array.isArray(scores)) {
    throw new ScoreValidationError('Score data must be an array');
  }
  
  scores.forEach((score, index) => {
    if (typeof score.verascore !== 'number') {
      throw new ScoreValidationError(`Invalid score at index ${index}: verascore must be a number`);
    }
    if (score.verascore < 0 || score.verascore > 100) {
      throw new ScoreValidationError(`Score out of range at index ${index}: must be between 0 and 100`);
    }
  });
}; 