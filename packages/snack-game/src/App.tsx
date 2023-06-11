import { FC } from "react";

import ErrorBoundary from "@components/bases/ErrorBoundary";
import MainPage from "@pages/MainPage";

interface AppProps {
  children?: never;
}

const App: FC<AppProps> = () => {
  return (
    <ErrorBoundary>
      <MainPage></MainPage>
    </ErrorBoundary>
  );
};

export default App;
