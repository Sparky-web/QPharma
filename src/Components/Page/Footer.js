import React from 'react';
import {gql, useQuery} from "@apollo/client";

function Footer() {
    const {data: _data, loading,  error} = useQuery(gql`
        query {
            contents(where: {name: "footer"}) {
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
        <footer>
            <div className="container">
                <div className="footer--text-block">
                    <div>ООО "Привилегия Фарм" лицензия ЛО-77-02-008717</div>
                    <div>ИП Шиглов Евгений Геннадьевич ИНН 025507074146  ОГРНИП 318028000196931</div>
                    <div>ИП Лабин Роман Викторович ИНН 774334481505 ОГРНИП 320774600323386</div>
                </div>
                <a href={data.link} className="green">{data.text2}</a>
            </div>
        </footer>
    );
}

export default Footer;
