import { renderHook } from '@testing-library/react-hooks';
import { useScoreData } from '../useScoreData';

test('loads and calculates score data', async () => {
  const { result, waitForNextUpdate } = renderHook(() => 
    useScoreData('test-member-id')
  );

  expect(result.current.isLoading).toBe(true);
  await waitForNextUpdate();
  expect(result.current.scoreMetrics).toBeDefined();
}); 