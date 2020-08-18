import React, {useState, useContext} from 'react';
import {CartContext} from "../../utils/CartContext";
import Item from "./Item";

function Index(props) {
    const [cart, setCart] = useContext(CartContext)

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")

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

                <form action="">
                    <div className="inputGroup">
                        <div>Ваше имя *</div>
                        <input type="text" placeholder="Иван" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="inputGroup">
                        <div>Ваш телефон *</div>
                        <input type="text" placeholder="+79124322233" value={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="inputGroup">
                        <div>Ваш Email *</div>
                        <input type="text" placeholder="ivan.ivanov@example.com" value={phone} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="inputGroup">
                        <div>Название компании (необязательно)</div>
                        <input type="text"/>
                    </div>
                    <div className="checkboxGroup">
                        <input type="checkbox"/>
                        <div>Согласен с обработкой персональных данных</div>
                    </div>
                    <button className="greenBtn">Заказать</button>
                </form>
            </div>
        </section>
    );
}

export default Index;