import React, {useState} from 'react';
import createApplication from "../../queries/createApplication";
import {useMutation} from "@apollo/client";
import {useHistory} from "react-router-dom"

function CallBack(props) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const history = useHistory()

    const [addApplication, { data }] = useMutation(createApplication)

    const onSubmit = (e) => {
        e.preventDefault()

        addApplication({variables: {name, phone, order: "Перезвонить"}})
            .then(() => history.push("/success"))
            .catch(e => {
                console.error(e)
                alert("Произошла ошибка, попробуйте позже")
            })
    }

    return (
        <section className="CallBack" id="call">
            <div className="container">
                <h2 className="header">Остались вопросы?</h2>
                <p>Ответим, поможем</p>
                <div className="form-wrap">
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Имя" name="name" value={name} onChange={e => setName(e.target.value)}/>
                        <input type="text" placeholder="Телефон" name="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <button className="greenBtn">Жду звонка <span><img src={require("../../img/call.svg")} alt=""/></span></button>
                    </form>
                    <p>Отправляя форму, Вы даете свое согласие на обработку персональных данных</p>
                </div>
            </div>
        </section>
    );
}

export default CallBack;