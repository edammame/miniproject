import React from "react";

const DropDown = ({ label, options, selected, onChange }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={label}
        name={label}
        value={selected}
        onChange={onChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
