import React, { Component } from "react";
import Select from "react-select";

const options = [
  { label: "Price", value: "price" },
  { label: "Size", value: "size" },
  { label: "ID", value: "id" }
];

const Sort = ({ isFixed, onSort }) => {
  console.log(isFixed);
  const majorColor = isFixed ? "#fff" : "#6f6f6f";
  const selectStyling = {
    control: styles => ({
      ...styles,
      backgroundColor: "inherit",
      borderColor: majorColor,
      borderWidth: '2px'
    }),
    clearIndicator: styles => ({ ...styles, color: majorColor }),
    indicatorSeparator: styles => ({ ...styles, backgroundColor: majorColor }),
    dropdownIndicator: styles => ({ ...styles, color: majorColor }),
    option: styles => ({ ...styles, color: "#000" }),
    placeholder: styles => ({ ...styles, color: majorColor }),
    singleValue: styles => ({ ...styles, color: majorColor }),
    valueContainer: styles =>({...styles, fontSize: '18px'})
  };

  return (
    <div class="sort" id="sort-container">
      <div class={`sort ${isFixed ? "fix-sort" : ""}`}>
        <div class="sort__selector">
          <Select
            styles={selectStyling}
            placeholder="Sort List By:"
            onChange={onSort}
            options={options}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default Sort;
