import React, {useContext, useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import product from "../../queries/product";
import {useParams, useHistory, Link} from "react-router-dom"
import Similar from "./Similar";
import SmallTabs from "./SmallTabs";
import {CartContext} from "../../utils/CartContext";
import Contacts from "../Page/Contacts";
import Footer from "../Page/Footer";

function Product(props) {
    const params = useParams()
    const {data, loading, error} = useQuery(product, {
        variables: {
            id: params.id
        }
    })
    const [amount, setAmount] = useState(1)
    const [size, setSize] = useState("")
    const [cart, setCart] = useContext(CartContext)
    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if(loading) return <div style={{display: "grid"}}>
            <div className="lds-ripple">
                <div/>
                <div/>
            </div>
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
                                {
                                    cart.find(el => el.id === data.product.id) ?
                                        <Link to="/cart">
                                            <button className="transparentBtn">К корзине</button>
                                        </Link> : <>
                                            <div className="product--amount">
                                                <button onClick={() => {if(amount !== 1) setAmount(amount - 1)}}>-</button>
                                                <input value={amount} readOnly type="text"/>
                                                <button onClick={() => {setAmount(amount + 1)}}>+</button>
                                            </div>
                                            <button className="greenBtn" onClick={() => {
                                                setCart(prev => [...prev, {...data.product, amount, size}])
                                                history.push("/cart")
                                            }}>Купить</button>
                                        </>
                                }

                            </div>
                            <div className="product-size-prot-section">
                                <div className="product--protection">
                                    <span className="gray">Класс защиты: </span><img src={require("../../img/protectopn.png")} alt=""/> {data.product.protection}
                                </div>
                                {data.product.sizes.length ? <div className="product--sizes">
                                    <div className="gray">Размеры:</div>
                                    {data.product.sizes.map(({size: el}, i) => (
                                        <button className={`product--size ${size === el ? "selected" : ""}`} onClick={() => setSize(el)} key={i}>{el}</button>
                                    ))}
                                </div> : <div />}
                            </div>
                            <div className="product--description-text">
                                {data.product.description}
                            </div>
                        </div>
                        <SmallTabs categoryName={data.product.categoryName} product={data.product}/>
                    </div>
                </div>
            </section>
            <Similar product={data.product} ids={data.products}/>
            <Contacts />

        </div>
    );
}

export default Product;