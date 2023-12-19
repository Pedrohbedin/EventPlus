import React from "react";
import "./FormComponents.css";

export const Input = ({
  type,
  id,
  required,
  aditionalClass,
  name,
  placeholder,
  manipulationFunction,
  value,
}) => {
  return (
    <input
      type={type}
      id={id}
      required={required}
      className={`input-component ${aditionalClass}`}
      placeholder={placeholder}
      onChange={manipulationFunction}
      autoComplete="off"
      value={value}
    />
  );
};

export const Button = ({
  textButton,
  id,
  name,
  type,
  aditionalClass,
  manipulationFunction,
}) => {
  return (
    <button
      type={type}
      id={id}
      name={name}
      className={`button-component ${aditionalClass}`}
      onClick={manipulationFunction}
    >
      {textButton}
    </button>
  );
};

export const Select = ({
  value,
  name,
  required,
  id,
  aditionalClass = "",
  manipulationFunction,
  dados = [],
  defaultValue = "",
  idKey = "",
  titleKey = "",
  defaultText = "",
}) => {
  return (
    <select
      name={name}
      required={required}
      id={id}
      className={`input-component ${aditionalClass}`}
      onChange={manipulationFunction}
      value={value}
    >
      <option value={defaultValue}>{defaultText}</option>
      {dados.map((opt) => {
        return (
          <option key={opt[idKey]} value={opt[idKey]}>
            {opt[titleKey]}
          </option>
        );
      })}
    </select>
  );
};
