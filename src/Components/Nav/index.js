import React, {useEffect, useState} from 'react';

function Navbar(props) {
    const [toggled, setToggle] = useState(false)
    useEffect(() => {
        if(window.innerWidth > 966) {setToggle(true)}
    }, [])
    const toggle = () => setToggle(!toggled)


    return (
        <nav>
            <div className="container">
                <div className="wrap">
                    <div className="logo"><img src={require("../../img/Логотип.png")} alt=""/></div>
                    <div className="hamburger" onClick={toggle}>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/menu-rounded.png"/>
                    </div>
                    <div className="collapse" style={{opacity: toggled ? 1 : 0, zIndex: toggled ? 999 : -999}}>
                        <div className="close" onClick={toggle}>
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/cancel.png"/>
                        </div>
                        <a href="#">Мы <span className="green">на карте</span></a>
                        <a href="#">По всем вопросам <span className="green">sale@q-pharma.ru</span></a>
                        <a href="#">8 800 301 30 41 <span className="green">Обратный звонок</span></a>
                        <a href="#">
                            <span className="cart">
                                <img src={require("../../img/cart.png")} alt=""/>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;