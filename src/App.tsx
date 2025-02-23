import React from 'react';
import MemberView from './components/MemberView';
import FinancialStats from './components/FinancialStats';

const App = () => {
  return (
    <div>
      <h1>Supabase Data Viewer</h1>
      <MemberView />
      <FinancialStats />
    </div>
  );
};

export default App; 