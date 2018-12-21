import React, { Component } from "react";
import Select from "react-select";

const options = [
  { label: "Price", value: "price" },
  { label: "Size", value: "size" },
  { label: "ID", value: "id" }
];

const Sort = props => {
  console.log(props.isFixed);
  return (
    <div class="sort" id="sort-container">
      <div class={`sort ${props.isFixed ? "fix-sort" : ""}`}>
        <div class="sort__selector">
          <Select
            placeholder="Sort List By:"
            onChange={props.onSort}
            options={options}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default Sort;
