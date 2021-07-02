import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./resources/reset.sass";
import "./resources/main.sass";

import ErrorBoundry from "./components/error-boundry";
import { ServiceProvider } from "./components/service-provider";
import App from "./components/app";

import RequestApi from "./services/api";
import store from "./store";

const service = new RequestApi();

ReactDom.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ServiceProvider value={service}>
        <Router>
          <App />
        </Router>
      </ServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);

import "./resources/media.sass";
