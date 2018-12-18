import React from 'react';

const Advertisement = (props) => {
    const source = `/ads/?r=${props.Id}`;
    return (
        (<div style={{ width: '100%', height: '255px', textAlign: 'center' }}>
            <p>But first, a word from our sponsors:</p>
            <img src={source} />
        </div>)
    )
}

export default Advertisement;