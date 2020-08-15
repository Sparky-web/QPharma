import React, {useEffect, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import client from "../../utils/client";

import PAGE_QUERY from "../../queries/page"
import Card from "./card";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


async function getProducts (limit, start, sort) {
    return await client.query({
        query: PAGE_QUERY,
        variables: {
            limit,
            start,
            sort
        }
    })
}

function Products(props) {
    const [limit, setLimit] = useState(6)
    const [startPoint, setStartPoint] = useState(0)
    const [sort, setSort] = useState("id")

    const [products, setProducts] = useState([[], [], [], []])
    const [categories, setCategories] = useState([{},{},{},{}]);
    const [count, setCount] = useState([0, 0, 0, 0])

    const displayMore = async () => {
        const {data} = await getProducts(limit, startPoint, sort)

        if (data) {
            setProducts(prevState => {
                const copy = [...prevState]
                copy[0] = [...copy[0], ...data.masks];

                return copy
            })

            setCategories(data.categories)
            setStartPoint(startPoint + limit)

            const copyCount = [...count]
            copyCount[0] = data.masksConnection.aggregate.totalCount

            setCount(copyCount)
        }
    }
    const displayNewAmount = async (newLimit) => {
        setLimit(newLimit)
        setStartPoint(startPoint + newLimit)
        const {data} = await getProducts(newLimit, 0, sort)

        setProducts(prevState => {
            const copy = [...prevState]
            copy[0] = data.masks
            return copy
        })

    }

    useEffect(() => {
        displayMore().catch(e => <div>sdf</div>)
    }, [])

    const options = [{
        value: "id",
        label: "По умолчанию"
    }, {
        value: "discountPrice:asc",
        label: "Цена: по возрастанию"
    }, {
        value: "discountPrice:desc",
        label: "Цена: по убыванию"
    }]

    return (
        <section id="products" className="Products">
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
                                            <h5>{el.name}<span>{count[i]}</span></h5>
                                        </div>
                                    </Tab>
                                )
                            })
                        }
                    </TabList>
                    <div className="tabs-wrapper">
                        <span>Показать</span>
                        <TabList className="tabs">
                                {categories.map((el, i) => (
                                    <Tab key={i}>
                                        {el.name}
                                        <span>{count[i]}</span>
                                    </Tab>
                                ))}
                        </TabList>
                        <Dropdown options={options} onChange={val => {
                            setSort(val.value)
                            displayNewAmount(limit)
                            return val
                        }}  placeholder="Select an option" />
                    </div>
                    {
                        products.map((items, i) => (
                            <TabPanel key={i}>
                                {
                                    items.map(el => (<Card el={el} key={el.id}/>))
                                 }
                            </TabPanel>
                        ))
                    }
                    <div className="navigation">
                        <div/>
                        <button className="displayMore" onClick={() => displayMore()}>
                            Показать еще ↓
                        </button>
                        <div className="displayAmount">
                            Показывать по
                            <span onClick={() => displayNewAmount(6)} className={`radio ${limit === 6 ? "active" : ""}`}>6</span>
                            <span onClick={() => displayNewAmount(12)} className={`radio ${limit === 12 ? "active" : ""}`}>12</span>
                            <span onClick={() => displayNewAmount(24)} className={`radio ${limit === 24 ? "active" : ""}`}>24</span>
                        </div>
                    </div>

                </Tabs>
            </div>
        </section>
    );
}

export default Products;