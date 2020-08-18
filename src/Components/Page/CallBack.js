import React from 'react';

function CallBack(props) {
    return (
        <section className="CallBack" id="call">
            <div className="container">
                <h2 className="header">Остались вопросы?</h2>
                <p>Ответим, поможем</p>
                <div className="form-wrap">
                    <form action="">
                        <input type="text" placeholder="Имя" name="name"/>
                        <input type="text" placeholder="Телефон" name="phone"/>
                        <button className="greenBtn">Жду звонка <span><img src={require("../../img/call.svg")} alt=""/></span></button>
                    </form>
                    <p>Отправляя форму, Вы даете свое согласие на обработку персональных данных</p>
                </div>
            </div>
        </section>
    );
}

export default CallBack;