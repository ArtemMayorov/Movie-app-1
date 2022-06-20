import React from "react";
// eslint-disable-next-line import/order
import { createRoot } from "react-dom/client";
import App from "./App/App";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App></App>);
