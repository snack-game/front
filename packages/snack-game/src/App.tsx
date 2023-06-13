import {FC, lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import ErrorBoundary from "@components/bases/ErrorBoundary";

const MainPage = lazy(() => import('@pages/MainPage'));

interface AppProps {
  children?: never;
}

const App: FC<AppProps> = () => {
  return (
    <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Suspense>
    </ErrorBoundary>
  );
};

export default App;
