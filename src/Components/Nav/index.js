import React, {useEffect, useState, useContext} from 'react';

import {CartContext} from "../../utils/CartContext";
import {Link} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";

function Navbar(props) {
    const [toggled, setToggle] = useState(false)
    useEffect(() => {
        if(window.innerWidth > 966) {setToggle(true)}
    }, [])
    const toggle = () => setToggle(!toggled)


    const [cart, setCart] = useContext(CartContext)

    const {data: _data, loading,  error} = useQuery(gql`
        query {
            contents(where: {name: "Contacts"}) {
                name,
                data
            }
        }
    `)

    if(loading) return <div/>
    if(error) return <h2>Произошла ошибка, попробуйте еще раз</h2>

    const data = _data.contents[0].data


    return (
        <nav>
            <div className="container">
                <div className="wrap">
                    <Link to={"/market"} className="logo"><img src={require("../../img/Логотип.png")} alt=""/></Link>
                    <div className="hamburger" onClick={toggle}>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/menu-rounded.png"/>
                    </div>
                    <div className="collapse" style={{opacity: toggled ? 1 : 0, zIndex: toggled ? 999 : -999}}>
                        <div className="close" onClick={toggle}>
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/cancel.png"/>
                        </div>
                        <a href={"https://yandex.ru/maps/-/CCQtFHXIPA"}>Мы <span className="green">на карте</span></a>
                        <a href="#">По всем вопросам <span className="green">{data.email}</span></a>
                        <a href="#call">{data.phone2}<span className="green"> Обратный звонок</span></a>
                        <Link to={"/cart"}>
                            <span className="cart">
                                <img src={require("../../img/cart.png")} alt=""/>
                                <span>{cart.length - 1}</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;