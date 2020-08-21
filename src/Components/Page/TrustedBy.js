import React from 'react';

function TrustedBy(props) {
    return (
        <section className="TrustedBy">
            <div className="container">
                <h2 className="header">Нам доверяют</h2>
                <div className="brands">
                    {props.data[0].images.map(({url}, i) => {
                        const imageUrl = process.env.REACT_APP_BACKEND_URL + url;
                        return <div key={i}>
                            <img src={imageUrl} alt=""/>
                        </div>
                    })}
                </div>
            </div>
        </section>
    );
}

export default TrustedBy;