import './App.css';

import MainPage from '@pages/MainPage';

import ErrorBoundary from './components/bases/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <MainPage></MainPage>
    </ErrorBoundary>
  );
};

export default App;
