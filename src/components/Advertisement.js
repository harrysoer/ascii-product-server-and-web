import React from 'react';
import axios from 'axios';

const Advertisement = (props) => {
    const source = `/ads/?r=${props.Id}`;
    console.log(source)
    return (
        (<div style={{ width: '100%', height: '255px', textAlign: 'center' }}>
            <p>But first, a word from our sponsors:</p>
            <img src={source} />
        </div>)
    )
}

export default Advertisement;