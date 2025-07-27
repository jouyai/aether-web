import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center">Oops! Ada masalah nih. Refresh coba ya!</div>;
    }
    return this.props.children; 
  }
}
