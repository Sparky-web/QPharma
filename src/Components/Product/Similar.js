import React from 'react';
import Card from "../Page/card";
import products from "../../queries/products";
import {useQuery} from "@apollo/client";

function Similar(props) {
    const {data, loading, error} = useQuery(products, {
        variables: {
            limit: 3,
            categoryName: props.categoryName
        }
    })

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