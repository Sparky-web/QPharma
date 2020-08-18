import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Page from "../Page"
import Nav from "../Nav"
import Cart from "../Cart"

import {CartProvider} from "../../utils/CartContext";
import {useQuery} from "@apollo/client";
import PAGE_QUERY from "../../queries/page";

function App() {
  return (
    <div className="App">
        <CartProvider>
            <Nav />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/products"/>
                </Route>
                <Route path="/products">
                    <Page />
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
