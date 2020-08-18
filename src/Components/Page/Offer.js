import React from 'react';

function Offer({content}) {
    const data = content.find(el => el.name === "Offer").data;

    return (
        <section id="offer" className="Offer">
            <div className="container">
                <div className="headline-wrap">
                    <h1 className="header">
                        {data.name} <span className="gray">{data.element}</span>
                    </h1>
                    <p>
                        {data.subTitle}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Offer;