import "./App.css";
import { FC } from "react";

import MainPage from "@pages/MainPage";

import ErrorBoundary from "./components/bases/ErrorBoundary";

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
