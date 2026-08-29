import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ShapefileContextProvider } from "./context/provideShapefileContext.tsx";
import "./typography.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShapefileContextProvider>
      <App />
    </ShapefileContextProvider>
  </StrictMode>,
);
