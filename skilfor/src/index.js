import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    green_dark: "#75a29e",
    green_light: "#a3f29c",
    orange: "#e5be90",
    grey_dark: "#585858",
    grey_light: "#c4c4c4",
    white_pure: "#fff",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
