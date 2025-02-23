import { FC } from 'react';
import MemberView from './components/MemberView';
import FinancialStats from './components/FinancialStats';

const App: FC = () => {
  return (
    <div>
      <h1>Supabase Data Viewer</h1>
      <MemberView />
      <FinancialStats />
    </div>
  );
};

export default App; 