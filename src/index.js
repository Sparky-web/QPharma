import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./Components/App";
import client from "./utils/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router basename="/">
            <App />
        </Router>
    </ApolloProvider>,
  document.getElementById("root")
);
