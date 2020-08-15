import React from 'react';

function Card(props) {
    const imageUrl =
        process.env.NODE_ENV !== "development"
            ? props.el.images?.[0]?.url
            : process.env.REACT_APP_BACKEND_URL + props.el.images?.[0]?.url;

    return (
        <div className="card" key={props.el.id}>
            <div className="top">
                <div
                    className="discount">-{100 - Math.round(props.el.discountPrice / (props.el.price / 100))}%
                </div>
                <span
                    className={props.el.isAvailable ? "available" : "not-available"}>{props.el.isAvailable ? "✓ В наличии" : "Нет в наличии"}
                                                    </span>
            </div>
            <div className="image"><img src={imageUrl} alt=""/>
            </div>
            <div className="name">{props.el.name}</div>
            <div className="price-block">
                <div className="protection">
                    <img src={require("../../img/protectopn.png")} alt=""/>
                    <div>
                        {props.el.protection !== "-" ? props.el.protection : ""}
                    </div>
                </div>
                <div className="price">
                    {props.el.discountPrice}p
                    <span className="prevPrice">{props.el.price}p</span>
                </div>
            </div>
            <div className="buttons">
                <button className="collect"><div>В корзину</div><img src={require("../../img/cart.svg")} alt=""/></button>
                <button className="buy">Купить в 1 клик</button>
            </div>
        </div>
    );
}

export default Card;