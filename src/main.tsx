import "core-js/stable";
import "regenerator-runtime/runtime";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/store.ts";
import { ThemeProvider } from "./modules/core/contexts/theme-provider.tsx";
import LocaleProvider from "./modules/core/contexts/locale.context.tsx";
import { TooltipProvider } from "./shadcn/components/ui/tooltip.tsx";
import { Toaster } from "./shadcn/components/ui/toaster.tsx";
import ErrorFallback from "./routes/error-boundry/index.tsx";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LocaleProvider>
          <TooltipProvider>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => (location.href = "/")}
            >
              <App />
            </ErrorBoundary>

            <Toaster />
          </TooltipProvider>
        </LocaleProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
