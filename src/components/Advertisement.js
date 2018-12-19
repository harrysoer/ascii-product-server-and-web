import React from 'react';

const Advertisement = (props) => {
    const source = `/ads/?r=${props.Id}`;
    return (
        (<div class="ads">
            <p>But first, a word from our sponsors:</p>
            <img class="ads-img" src={source} />
        </div>)
    )
}

export default Advertisement;