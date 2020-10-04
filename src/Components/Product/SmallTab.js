import React, {useContext, useState} from 'react';
import {CartContext} from "../../utils/CartContext";
import {Link} from "react-router-dom";

function SmallTab({product}) {
    const [cart, setCart] = useContext(CartContext)

    const addToCart = (item) => {
        setCart(prevCart => [...prevCart, {...item, amount: 1}])
    }

    return (
        <div className="product--small-card">
            <div className="image">
                <div
                    className="product--discount">-{100 - Math.round(product.discountPrice / (product.price / 100))}%
                </div>
                <img src={process.env.REACT_APP_BACKEND_URL + product.images[0].url} alt=""/>
            </div>
            <div className="product--small-card-description">
                <Link to={`/products/${product.id}`} className="name">{product.name.length > 30 ? `${product.name.slice(0, 30)}...` : product.name}</Link>
                <div className="prot-row">
                    <div className="product--protection">
                        <img src={require("../../img/protectopn.png")} alt=""/> {product.protection}
                    </div>
                    <span
                        className={product.isAvailable ? "product--available" : "product--not-available"}>{product.isAvailable ? "✓ В наличии" : "Нет в наличии"}
                                    </span>
                </div>
                <div className="price-row">
                    <div className="product--price">
                        {product.discountPrice}p
                        <span className="prevPrice">{product.price}p</span>
                    </div>
                    <button onClick={() => addToCart(product)} style={{display: cart.find(el => el.id === product.id) ? "none" : "block"}}><img src={require("../../img/cart.png")} alt=""/></button>
                    <div className="ok" style={{display: cart.find(el => el.id === product.id) ? "block" : "none"}}>✓</div>
                </div>
            </div>
        </div>
    );
}

export default SmallTab;