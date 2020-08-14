import React, {useEffect, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {useLazyQuery, useQuery} from "@apollo/client";
import client from "../../utils/client";

import PAGE_QUERY from "../../queries/page"
import Card from "./card";


async function getProducts (limit, start) {
    return await client.query({
        query: PAGE_QUERY,
        variables: {
            limit,
            start
        }
    })
}

function Products(props) {
    const [limit, setLimit] = useState(2)
    const [displayAmount, setDisplayAmount] = useState(2)
    const [startPoint, setStartPoint] = useState(0)

    const [products, setProducts] = useState([[], [], [], []])
    const [categories, setCategories] = useState([{},{},{},{}]);


    const displayMore = async () => {
        const {data} = await getProducts(limit, startPoint)

        if (data) {
            setProducts(prevState => {
                const copy = [...prevState]
                copy[0] = [...copy[0], ...data.masks];

                return copy
            })
            setCategories(data.categories)
            setStartPoint(startPoint + limit)
        }
    }

    useEffect(() => {
        displayMore()
    }, [])

    return (
        <section id="products" className="Products">
            <button onClick={displayMore}>
                Показать больше
            </button>
            <div className="container">
                <h2 className="header">Каталог защиты</h2>
                <Tabs>
                    <TabList className="prettified-tabs">
                        {
                            categories.map((el, i) => {
                                const imageUrl =
                                    process.env.NODE_ENV !== "development"
                                        ? el?.image?.url
                                        : process.env.REACT_APP_BACKEND_URL + el?.image?.url;
                                return (
                                    <Tab style={{backgroundImage: `url("${imageUrl}")`}} key={i}>
                                        <div>
                                            <h5>{el.name}<span>2</span></h5>
                                        </div>
                                    </Tab>
                                )
                            })
                        }
                    </TabList>
                    {
                        products.map((items, i) => (
                            <TabPanel key={i}>
                                {
                                    items.map(el => (<Card el={el} key={el.id}/>))
                                }
                            </TabPanel>
                        ))
                    }
                </Tabs>
            </div>
        </section>
    );
}

export default Products;