import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Page from "../Page"
import Nav from "../Nav"
import Cart from "../Cart"

import {CartProvider} from "../../utils/CartContext";
import Success from "./Success";
import Product from "../Product/index";
import Popup from "../Popup";

function App() {
  return (
    <div className="App">
        <CartProvider>
            <Popup />
            <Nav />
            <Switch>
                <Route exact path="/">
                    <Redirect to={"/market"}/>
                </Route>
                <Route exact path="/products/">
                    <Redirect to={"/market"}/>
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
                <Route path="/products/:id">
                    <Product />
                </Route>
            </Switch>
        </CartProvider>
    </div>
  );
}

export default App;
