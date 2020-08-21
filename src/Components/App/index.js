import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Page from "../Page"
import Nav from "../Nav"
import Cart from "../Cart"
import Redirect_ from "../Page/redirect.js"

import {CartProvider} from "../../utils/CartContext";
import Success from "./Success";

function App() {
  return (
    <div className="App">
        <CartProvider>
            <Nav />
            <Switch>
                <Route exact path="/">
                    <Redirect_ />
                </Route>
                <Route path="/market">
                    <Page />
                </Route>
                <Route path="/success">
                    <Success />
                </Route>
                <Route path="/cart">
                    <Cart/>
                </Route>
            </Switch>
        </CartProvider>
    </div>
  );
}

export default App;
