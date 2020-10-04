import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import { useQuery } from "@apollo/client";
import PRODUCTS_QUERY from "../../queries/products"
import Card from "./card";

import 'react-dropdown/style.css';

function Category(props) {
    const {categoryName} = useParams()
    const [limit, setLimit] = useState(6)

    const {loading, error, fetchMore, data} = useQuery(PRODUCTS_QUERY, {
        variables: {
            categoryName,
            sort: props.sort,
            limit,
            start: 0
        },
        fetchPolicy: "cache-and-network"
    })

    const more = () => fetchMore({
        variables: {
            start: data.products.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
                products: [...prev.products, ...fetchMoreResult.products]
            });
        }
    })
    useEffect(() => {
        window.scroll(0, props.scrollY)
    })

    if(loading) return <div className="lds-ripple">
        <div/>
        <div/>
    </div>
    if(error) return <h1>Произошла ошибка, попробуйте позже</h1>

    return (
        <div className="wrap">
            <div className="react-tabs__tab-panel">
                {
                    data.products.map(product => <Card key={product.id} el={product}/>)
                }
            </div>
            <div className="navigation">
                <div/>
                <button className="displayMore" onClick={more}>
                    Показать еще ↓
                </button>
                <div className="displayAmount">
                    Показывать по
                    <span onClick={() => setLimit(6)} className={`radio ${limit === 6 ? "active" : ""}`}>6</span>
                    <span onClick={() => setLimit(12)} className={`radio ${limit === 12 ? "active" : ""}`}>12</span>
                    <span onClick={() => setLimit(24)} className={`radio ${limit === 24 ? "active" : ""}`}>24</span>
                </div>
            </div>
        </div>
    );
}

export default Category;