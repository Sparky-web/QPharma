import React from 'react';
import {gql, useQuery} from "@apollo/client";

function Footer({content}) {
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
                <div>{data.text1}</div>
                <a href={data.link} className="green">{data.text2}</a>
            </div>
        </footer>
    );
}

export default Footer;