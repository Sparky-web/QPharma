import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import axios from "axios"

Modal.setAppElement("#root")

function Popup(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [isSent, setIsSent] = useState(false)

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 15000)
    }, [])

    const onSubmit = async (e) => {
        try {
            e.preventDefault()
            const {data: res} = await axios.post("http://130.193.62.25:5111/subscribe", {
                email
            })
            setIsSent(true)
        } catch (e) {
            alert("Произошла ошибка, попробуйте позже")
        }
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Рассылка"
            >
                <div className="newsletter-popup">
                    <img onClick={() => setIsOpen(false)}
                         src="https://img.icons8.com/ios-filled/24/707070/delete-sign.png" alt=""/>
                    {!isSent && <div style={{display: "contents"}}>
                        <h2 className="name">Подпишитесь на нашу рассылку</h2>
                        <p>Будте вкурсе всех актуальных акций и новинок нашей компании.</p>
                        <div className="form-wrap">
                            <form onSubmit={onSubmit}>
                                <label>Ваш Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="text"
                                       placeholder="email@example.com"/>
                                <button type="submit" className="greenBtn">Подписаться</button>
                            </form>
                        </div>
                    </div>}
                    {isSent && <div>
                        <img alt="" src="https://img.icons8.com/fluent/96/000000/ok.png"/>
                        <h2>Вы успешно подписалсиь на рассылку</h2>
                    </div>}
                </div>
            </Modal>
        </div>
    );
}

export default Popup;
