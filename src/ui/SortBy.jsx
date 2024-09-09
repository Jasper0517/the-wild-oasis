import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    const value = e.target.value;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };
  const currentValue = searchParams.get("sortBy") || options[0].value;
  return (
    <Select
      options={options}
      value={currentValue}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;
