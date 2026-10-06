import React, { Component, ReactNode, ErrorInfo } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Campus Navigator caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          backgroundColor: "#0d1f0f",
          color: "#e8f5e9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center"
        }}>
          <div style={{
            maxWidth: "360px",
            backgroundColor: "#1a2e1c",
            padding: "28px",
            borderRadius: "24px",
            border: "1px solid rgba(5,150,105,0.3)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: "900", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
              Campus Navigator
            </h2>
            <p style={{ fontSize: "12px", color: "#a0b5a3", marginBottom: "20px" }}>
              A display error occurred. Tap below to reload.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#059669",
                color: "#0d1f0f",
                border: "none",
                borderRadius: "16px",
                fontSize: "12px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer"
              }}
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);