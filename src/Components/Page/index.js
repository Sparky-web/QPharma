import React from 'react';
import Offer from "./Offer";
import NewProducts from "./NewProducts";
import Faq from "./FAQ";
import {useQuery} from "@apollo/client";
import PAGE_QUERY from "../../queries/page"
import CallBack from "./CallBack";
import TrustedBy from "./TrustedBy";
import Certificates from "./Certificates";
import Contacts from "./Contacts";
import Footer from "./Footer";

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
            <Faq data={data.faqs}/>
            <CallBack />
            <TrustedBy data={data.trustedBies}/>
            <Certificates data={data.certificates}/>
            <Contacts content={data.contents}/>
            <Footer content={data.contents}/>
        </div>
    );
}

export default Page;