import React, {useContext, useState} from 'react';
import {useQuery} from "@apollo/client";
import product from "../../queries/product";
import {useParams, useHistory} from "react-router-dom"
import Similar from "./Similar";
import SmallTabs from "./SmallTabs";
import {CartContext} from "../../utils/CartContext";

function Product(props) {
    const params = useParams()
    const {data, loading, error} = useQuery(product, {
        variables: {
            id: params.id
        }
    })
    const [amount, setAmount] = useState(1)
    const [cart, setCart] = useContext(CartContext)
    const history = useHistory()

    if(loading) return <div className="lds-ripple">
        <div/>
        <div/>
    </div>
    if(error) return <h2>Произошла ошибка, попробуйте еще раз</h2>


    return (
        <div className="product">
            <section>
                <div className="container">
                    <h2 className="header">{data.product.name}</h2>
                    <div className="product--card">
                        <div className="product--img">
                            <img src={process.env.REACT_APP_BACKEND_URL + data.product.images[0].url} alt=""/>
                        </div>
                        <div className="product--description">
                            <div className="product--price-block">
                                <div className="product--price">{data.product.discountPrice} ₽<div className="prevPrice">{data.product.price} ₽</div></div>
                                <span
                                    className={data.product.isAvailable ? "product--available" : "product--not-available"}>{data.product.isAvailable ? "✓ В наличии" : "Нет в наличии"}
                                </span>
                                <div className="product--logo"><img src={require("../../img/Логотип.png")} alt=""/></div>
                            </div>
                            <div className="product--buy-section">
                                <div className="product--amount">
                                    <button onClick={() => {setAmount(amount - 1)}}>-</button>
                                    <input value={amount} readOnly type="text"/>
                                    <button onClick={() => {setAmount(amount + 1)}}>+</button>
                                </div>
                                <button className="greenBtn" onClick={() => {
                                    setCart(prev => [...prev, {...data.product, amount}])
                                    history.push("/cart")
                                }}>Купить</button>
                            </div>
                            <div className="product-size-prot-section">
                                <div className="product--protection">
                                    <span className="gray">Класс защиты: </span><img src={require("../../img/protectopn.png")} alt=""/> {data.product.protection}
                                </div>
                                <div className="product--sizes">
                                    <div className="gray">Размеры: </div>
                                    <button className="product--size">L</button>
                                    <button className="product--size selected">L</button>
                                    <button className="product--size">L</button>
                                </div>
                            </div>
                            <div className="product--description-text">
                                {data.product.description}
                            </div>
                        </div>
                        <SmallTabs categoryName={data.product.categoryName}/>
                    </div>
                </div>
            </section>
            <Similar categoryName={data.product.categoryName}/>
        </div>
    );
}

export default Product;