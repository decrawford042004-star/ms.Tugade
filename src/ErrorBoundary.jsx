import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  static getDerivedStateFromError(error) {
    return { message: error?.message || String(error) };
  }

  render() {
    if (this.state.message) {
      return (
        <div style={{ padding: 24, fontFamily: "sans-serif", color: "#1e2a24" }}>
          <h1>SpotiDec hit an error</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
