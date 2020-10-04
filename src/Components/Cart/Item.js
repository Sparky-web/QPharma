import React, {useState, useContext} from 'react';
import {CartContext} from "../../utils/CartContext";
import {Link} from "react-router-dom";

function Item({item}) {
    const [cart, setCart] = useContext(CartContext)

    const increaseCount = () => {
        setCart(prevCart => {
          const cart = [...prevCart];
          const i = prevCart.indexOf(item);
          cart[i].amount += 1
          return cart
        })
    }
    const decreaseCount = () => {
        setCart(prevCart => {
            let cart = [...prevCart];
            const i = prevCart.indexOf(item);
            if(cart[i].amount > 0) {
                cart[i].amount -= 1
            }
            if(cart[i].amount === 0) {
                cart = cart.filter(el => el.id !== item.id)
            }
            return cart
        })
    }

    return (
        <tr>
            <th><Link to={"/products/" + item.id}>{item.name}</Link></th>
            <td>{item.discountPrice} ₽</td>
            <td>
                <div className="product--amount">
                    <button onClick={decreaseCount}>-</button>
                    <input value={item.amount} readOnly type="text"/>
                    <button onClick={increaseCount}>+</button>
                </div>
            </td>
            <td>{item.discountPrice * item.amount} ₽</td>
        </tr>
    );
}

export default Item;