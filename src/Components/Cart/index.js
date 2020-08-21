import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom"
import {CartContext} from "../../utils/CartContext";
import Item from "./Item";
import {useMutation} from "@apollo/client";
import createApplication from "../../queries/createApplication";

function Index(props) {
    const [cart, setCart] = useContext(CartContext)
    const history = useHistory()
    const [addApplication, { data }] = useMutation(createApplication);

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [checked, setChecked] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(name && phone && email && cart.filter(el => el).length && checked) {
            let _cart = cart.filter(el => el)
            const order = _cart.map(el => `
Товар: ${el.name},
Кол-во: ${el.amount}
Цена за штуку: ${el.discountPrice} ₽
Цена за позицию: ${el.discountPrice * el.amount} ₽
`)
            order.push(`Итого: ${cart.reduce((accomulator, val) => accomulator + val.discountPrice * val.amount)} ₽`)
            addApplication({ variables: { name, phone, email, order: order.join("\n"), company } })
                .then(() => {
                    setCart([0])
                    history.push("/success")
                })
                .catch(e => {
                    console.error(e)
                    alert("Произошла ошибка, попробуйте позже")
                })
        } else if(!cart.filter(el => el).length) {
            alert("Заполните корзину")
        } else if(!checked) {
            alert("Согласитесь с обработкой персональных данных")
        } else alert("Заполните все обязательные поля")


    }

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

                <form onSubmit={onSubmit}>
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
                        <input type="text" placeholder="ivan.ivanov@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="inputGroup">
                        <div>Название компании (необязательно)</div>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)}/>
                    </div>
                    <div className="checkboxGroup">
                        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
                        <div>Согласен с обработкой персональных данных</div>
                    </div>
                    <button className="greenBtn">Заказать</button>
                </form>
            </div>
        </section>
    );
}

export default Index;