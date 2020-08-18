import React from 'react';

function Footer({content}) {
    const data = content.find(el => el.name === "footer").data;
    return (
        <footer>
            <div className="container">
                <div>{data.text1}</div>
                <a href={data.link} className="green">{data.text2}</a>
            </div>
        </footer>
    );
}

export default Footer;