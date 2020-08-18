import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import CATEGORIES_QUERY from "../../queries/categories"
import {Switch, Link, Route} from "react-router-dom";
import Category from "./Category";
import Dropdown from "react-dropdown";

function NewProducts(props) {
    const {data, loading, error} = useQuery(CATEGORIES_QUERY)
    const [sort, setSort] = useState("id")
    const [active, setActive] = useState("all")

    if (loading) return <h1>Loading...</h1>
    if (error) return <h3>{JSON.stringify(error)}</h3>

    const options = [
        {
            value: "id",
            label: "По умолчанию"
        }, {
            value: "discountPrice:asc",
            label: "Цена: по возрастанию"
        }, {
            value: "discountPrice:desc",
            label: "Цена: по убыванию"
        }
    ]

    return (
        <section className="Products">
            <div className="container">
                <h2 className="header">Каталог защиты</h2>
                <div className="prettified-tabs">
                    {
                        data.categories.map((el, i) => {
                            const imageUrl =
                                process.env.NODE_ENV !== "development"
                                    ? el?.image?.url
                                    : process.env.REACT_APP_BACKEND_URL + el?.image?.url;
                            return (
                                <Link to={"/products/" + el.categoryName} onClick={() => setActive(el.categoryName)}
                                      style={{backgroundImage: `url("${imageUrl}")`}} key={i}>
                                    <div>
                                        <h5>{el.name}
                                            <span>{data.products.filter(e => e.categoryName === el.categoryName).length}</span>
                                        </h5>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="tabs-wrapper">
                    <span>Показать</span>
                    <ul className="tabs">
                        <li>
                            <Link onClick={() => setActive("all")} to={"/products"} className={active === "all" ? "active" : ""}>
                                Все
                                <span>
                                    {data.products.length}
                                </span>
                            </Link>
                        </li>
                        {data.categories.map((el, i) => (
                            <li key={i}>
                                <Link onClick={() => setActive(el.categoryName)} to={"/products/" + el.categoryName} className={active === el.categoryName ? "active" : ""}>
                                    {el.name}
                                    <span>
                                    {data.products.filter(e => e.categoryName === el.categoryName).length}
                                </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Dropdown options={options} onChange={val => {
                        setSort(val.value)
                    }} value={sort} placeholder="Select an option"/>
                </div>
                <Switch>
                    <Route exact path="/products">
                        <Category sort={sort}/>
                    </Route>
                    <Route exact path="/products/:categoryName">
                        <Category sort={sort}/>
                    </Route>
                </Switch>
                <div className="line"/>
            </div>
        </section>
    );
}

export default NewProducts;