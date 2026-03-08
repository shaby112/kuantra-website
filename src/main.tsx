import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const PUBLISHABLE_KEY = (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY;

function MissingConfig() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-3">Configuration Required</h1>
        <p className="text-muted-foreground leading-relaxed">
          `VITE_CLERK_PUBLISHABLE_KEY` is missing. Add it in your Vercel project environment
          variables and redeploy.
        </p>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);

if (!PUBLISHABLE_KEY) {
  root.render(
    <StrictMode>
      <MissingConfig />
    </StrictMode>,
  );
} else {
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </StrictMode>,
  );
}
