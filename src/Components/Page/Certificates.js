import React from 'react';

import Slider from "react-slick";

function Certificates(props) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1198,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="Certificates">
            <div className="container">
                <h2 className="header">Сертификаты</h2>
                <Slider {...settings}>
                    {
                        props.data[0].images.map(({url}, i) => {
                            const imageUrl = process.env.NODE_ENV !== "development"
                                ? url
                                : process.env.REACT_APP_BACKEND_URL + url;
                            return <div className="wrap" key={i}>
                                <img src={imageUrl} alt=""/>
                            </div>
                        })
                    }
                </Slider>
            </div>
        </section>
    );
}

export default Certificates;