import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { ThemeProvider } from "styled-components";
import "./i18n";

const theme = {
  colors: {
    green_dark: "#75a29e",
    green_light: "#a3f29c",
    orange: "#e5be90",
    grey_dark: "#585858",
    grey_light: "#c4c4c4",
    grey_bg: "#F0F0F0",
    white_pure: "#fff",
    success: "#5F9364",
    success_bg: "#CDF2CA",
    warn: "#D06224",
    warn_bg: "#F7E6AD",
    error: "#A9333A",
    error_bg: "#F6A9A9",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
