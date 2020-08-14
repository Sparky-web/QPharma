import React from "react";

import { Switch, Route } from "react-router-dom";

import Page from "../Page"
import Nav from "../Nav"

function App() {
  return (
    <div className="App">
        <Nav />
        <Switch>
          <Route path="/" component={Page} exact />
        </Switch>
    </div>
  );
}

export default App;
