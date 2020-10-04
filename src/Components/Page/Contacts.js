import React from 'react';
import {gql, useQuery} from "@apollo/client";

function Contacts({content}) {
    const {data: _data, loading,  error} = useQuery(gql`
        query {
            contents(where: {name: "Contacts"}) {
                name,
                data
            }
        }
    `)

    if(loading) return <div style={{display: "grid"}}>
        <div className="lds-ripple">
            <div/>
            <div/>
        </div>
    </div>
    if(error) return <h2>Произошла ошибка, попробуйте еще раз</h2>

    const data = _data.contents[0].data

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
                href="https://yandex.ru/maps/213/moscow/house/staropetrovskiy_proyezd_7as6/Z04YcwdhSk0DQFtvfXRzdXpjZg==/?ll=37.501385%2C55.824602&utm_medium=mapframe&utm_source=maps&z=17"
                style={{"color":"#eee","fontSize":"12px","position":"absolute","top":"14px"}}>Старопетровский проезд, 7Ас6 на карте
                Москвы, ближайшее метро Балтийская — Яндекс.Карты</a>
                <iframe src="https://yandex.ru/map-widget/v1/-/CCQtFHXMOA" frameBorder="1"
                        allowFullScreen={true} style={{"position":"relative"}} />

            </div>
        </section>
    );
}

export default Contacts;