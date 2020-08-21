import React, {useEffect} from 'react';

function Redirect(props) {
    useEffect(() => {
        window.location = "https://i.q-pharma.ru"
    })
    return (
        <div></div>
    );
}

export default Redirect;