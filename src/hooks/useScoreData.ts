import { useState, useEffect } from 'react';
import { getHistoricalScores } from '../api/scoreData';
import { calculateScoreMetrics } from '../utils/scoreCalculations';
import { validateScoreData } from '../utils/scoreValidation';
import type { ScoreMetrics } from '../types/scoreMetrics';

export const useScoreData = (memberId: string) => {
  const [scoreMetrics, setScoreMetrics] = useState<ScoreMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadScoreData() {
      try {
        setIsLoading(true);
        const historicalData = await getHistoricalScores(memberId);
        console.log('Raw historical data:', historicalData);
        validateScoreData(historicalData);
        const metrics = calculateScoreMetrics(historicalData);
        console.log('Calculated metrics:', metrics);
        
        if (isMounted) {
          setScoreMetrics(metrics);
          setError(null);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : 'Failed to load score data');
          console.error('Score calculation error:', e);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadScoreData();
    return () => { isMounted = false };
  }, [memberId]);

  return { scoreMetrics, isLoading, error };
}; 