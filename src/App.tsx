import { FC } from 'react';
import MemberListPage from './pages/MemberListPage';
import DataViewer from './pages/DataViewer.tsx';

const App: FC = () => {
  // Check if we're on the data view page
  const params = new URLSearchParams(window.location.search);
  const isDataView = params.get('view') === 'data';

  return isDataView ? <DataViewer /> : <MemberListPage />;
};

export default App; 