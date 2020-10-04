import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import products from "../../queries/products";
import SmallTab from "./SmallTab";


function SmallTabs(props) {
    const [start, setStart] = useState(0)
    const {data, loading, error} = useQuery(products, {
        variables: {
            limit: 3,
            start: start,
            categoryName: props.categoryName
        }
    })

    if(loading) return <div className="lds-ripple">
        <div/>
        <div/>
    </div>
    if(error) return <h1>Произошла ошибка, попробуйте позже</h1>

    return (
        <div className="product--similar">
            <div className="product--small-cards-tab">
                <p>Похожие товары</p>
                <div className="wrap">
                    {data.products.map(product => {
                        return props.product.id !== product.id ? <SmallTab key={product.id} product={product}/> : <></>
                    })}
                </div>
            </div>
        </div>
    );
}

export default SmallTabs;