import React, {useEffect, useState} from 'react';
import Card from "../Page/card";
import {useQuery} from "@apollo/client";
import similar from "../../queries/similar";
import shuffle from "lodash/shuffle"

function randomInteger(products, categoryName) {
    // случайное число от min до (max+1)
    let ids = products.filter(el => {
        return el.categoryName !== categoryName
    })
    ids = ids.map(el => el.id)
    ids = shuffle(ids)

    return ids.slice(0, 3)
}

function Similar(props) {
    const [ids, setIds] = useState([])
    const {data, loading, error} = useQuery(similar, {
        variables: {
            limit: 3,
            id: ids.length ? ids : 0
        }
    })

    useEffect(() => {
        setIds(randomInteger(props.ids, props.product.categoryName))
    }, [])


    if(loading) return <div className="lds-ripple">
        <div/>
        <div/>
    </div>
    if(error) return <h1>Произошла ошибка, попробуйте позже</h1>

    return (
        <section>
            <div className="container">
                <h2 className="header">С этим товаром покупают</h2>
                <div className="react-tabs__tab-panel">
                    {
                        data.products.map(product => <Card key={product.id} el={product}/>)
                    }
                </div>
            </div>
        </section>
    );
}

export default Similar;