import React from 'react';
import Select from 'react-select';

const options = [
    { label: "Price", value: "price" },
    { label: "Size", value: "size" },
    { label: "ID", value: "id" }
];

const Sort = (props) => {

    return (
        <div class="sort">
            <Select
                placeholder="Sort List By:"
                onChange={props.onSort}
                options={options}
                isClearable
            />
        </div>
    )
}

export default Sort