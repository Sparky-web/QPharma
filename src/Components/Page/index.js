import React, {Suspense} from 'react';
import {useQuery} from "@apollo/client";
import PAGE_QUERY from "../../queries/page"


import Offer from "./Offer";
import NewProducts from "./NewProducts";


const Faq = React.lazy(() => import("./FAQ"));
const CallBack = React.lazy(() => import("./CallBack"));
const TrustedBy = React.lazy(() => import("./TrustedBy"));
const Certificates = React.lazy(() => import("./Certificates"));
const Contacts = React.lazy(() => import("./Contacts"));
const Footer = React.lazy(() => import("./Footer"));

function Page(props) {
    const { data, loading, error } = useQuery(PAGE_QUERY)
    if(loading) return (
        <div className="loader-wrap">
            <div className="lds-ripple">
            <div/>
            <div/>
        </div>
    </div> )
    if(error) {
        console.error(error)
        return <h1>Произошла ошибка</h1>
    }


    return (
        <div>
            <Offer content={data.contents}/>
            <NewProducts />
            <Suspense fallback={<div style={{display: "grid"}}>
                <div className="lds-ripple">
                    <div/>
                    <div/>
                </div>
            </div>}>
                <Faq data={data.faqs}/>
                <CallBack />
                <TrustedBy data={data.trustedBies}/>
                <Certificates data={data.certificates}/>
                <Contacts content={data.contents}/>
                <Footer content={data.contents}/>
            </Suspense>
        </div>
    );
}

export default Page;