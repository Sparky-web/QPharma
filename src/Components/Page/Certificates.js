import React, {useState} from 'react';

import Slider from "react-slick";
import Modal from "react-modal";

Modal.setAppElement("#root")

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

    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [modalData, setModalData] = useState("")
    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    return (
        <section className="Certificates">
            <div className="container">
                <h2 className="header">Сертификаты</h2>
                <Slider {...settings}>
                    {
                        props.data[0].images.map(({url, previewUrl}, i) => {
                            const fullImageUrl = process.env.REACT_APP_BACKEND_URL + url;
                            return <div className="wrap" key={i}>
                                <img src={fullImageUrl} alt="" onClick={() => {
                                    setModalData(fullImageUrl)
                                    openModal()
                                }}/>
                            </div>
                        })
                    }
                </Slider>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >

                    <img className="closeIcon" onClick={closeModal} src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"/>

                    <img className="certeficateImg" src={modalData} alt=""/>

                </Modal>
            </div>
        </section>
    );
}

export default Certificates;