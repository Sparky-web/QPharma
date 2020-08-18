import React, {useState, useContext} from 'react';
import {CartContext} from "../../utils/CartContext";
import Item from "./Item";

function Index(props) {
    const [cart, setCart] = useContext(CartContext)

    return (
        <section className="Cart">
            <div className="container">
                <h2 className="header">Корзина</h2>
                <div className="twrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Кол-во</th>
                                <th>Всего</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => {
                                return item ? <Item item={item} key={item.id}/> : <tr />
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>{cart.reduce((accomulator, val) => accomulator + val.discountPrice * val.amount)} ₽</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Index;