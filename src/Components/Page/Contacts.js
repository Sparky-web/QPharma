import React from 'react';

function Contacts({content}) {
    const data = content.find(el => el.name === "Contacts").data;

    return (
        <section className="Contacts" id="contacts">

            <div className="contacts-card">
                <div>
                    <div className="office gray">Офис <span><img src={require("../../img/Логотип.png")} alt=""/></span></div>
                    <div className="bold" >{data.adress}</div>
                </div>
                <div>
                    <div className="gray">Контактные телефоны</div>
                    <div>
                        <div className="bold">{data.phone1}</div>
                        <div className="bold">{data.phone2}</div>
                    </div>
                </div>
                <div>
                    <div className="gray">По всем вопросам</div>
                    <div className="bold">{data.email}</div>
                </div>
                <a href="#call">
                    <button className="greenBtn">
                        <div>Заказать обратный звонок</div> <span><img src={require("../../img/call.svg")} alt=""/></span>
                    </button>
                </a>
            </div>
            <div className="yandex-maps" style={{"overflow":"hidden"}}><a
                href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
                style={{"color":"#eee","fontSize":"12px","position":"absolute","top":"0px"}}>Москва</a><a
                href="https://yandex.ru/maps/213/moscow/house/tverskaya_ulitsa_9s7/Z04YcAZgSkEGQFtvfXt0eH9hbQ==/?ll=37.610435%2C55.759091&source=wizgeo&utm_medium=mapframe&utm_source=maps&z=16.5"
                style={{"color":"#eee","fontSize":"12px","position":"absolute","top":"14px"}}>Тверская улица, 9с7 — Яндекс.Карты</a>
                <iframe src="https://yandex.ru/map-widget/v1/-/CCQtYQf-9C" frameBorder="1"
                        allowFullScreen={true} style={{"position":"relative"}} />
            </div>
        </section>
    );
}

export default Contacts;