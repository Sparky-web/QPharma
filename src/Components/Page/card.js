import React, {useState, useContext} from 'react';
import {CartContext} from "../../utils/CartContext";
import {Link, useHistory} from "react-router-dom";

function Card(props) {
    const [cart, setCart] = useContext(CartContext)
    const [inCart, setInCart] = useState(false)
    const history = useHistory()

    const imageUrl = process.env.REACT_APP_BACKEND_URL + props.el.images?.[0]?.url;

    const addToCart = (item) => {
        setInCart(true)
        setCart(prevCart => [...prevCart, {...item, amount: 1}])
    }

    return (
        <div className="product--card-tab" key={props.el.id}>
            <div className="top">
                <div
                    className="product--discount">-{100 - Math.round(props.el.discountPrice / (props.el.price / 100))}%
                </div>
                <span
                    className={props.el.isAvailable ? "available" : "not-available"}>{props.el.isAvailable ? "✓ В наличии" : "Нет в наличии"}
                                                    </span>
            </div>
            <div className="image"><img src={imageUrl} alt=""/>
            </div>
            <Link to={`/products/${props.el.id}`} className="name">{props.el.name}</Link>
            <div className="price-block">
                <div className="product--protection">
                    <img src={require("../../img/protectopn.png")} alt=""/>
                    <div>
                        {props.el.protection !== "-" ? props.el.protection : ""}
                    </div>
                </div>
                <div className="product--price">
                    {props.el.discountPrice}p
                    <span className="prevPrice">{props.el.price}p</span>
                </div>
            </div>
            <div className="buttons">
                <Link to="/cart" style={{display: inCart ? "block" : "none"}}>
                    <button className="transparentBtn">К корзине</button>
                </Link>
                <button className="greenBtn" style={{display: inCart ? "none" : "flex"}} onClick={() => addToCart(props.el)}><div>В корзину</div><img src={require("../../img/cart.svg")} alt=""/></button>
                <button className="transparentBtn" style={{display: inCart ? "none" : "flex"}} onClick={() => {
                    addToCart(props.el)
                    history.push("/cart")
                }}>Купить в 1 клик</button>
            </div>
        </div>
    );
}

export default Card;