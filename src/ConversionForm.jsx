import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import { formulas } from "./formulas.js";

/**
 * Form that converts between units.
 * @param {String} category "volume" || "mass" || "temperature":
 *                          Specifies which type of conversion units will be used.
 */
const ConversionForm = ({ category }) => {
  // Holds values in input fields.
  const [{ inputVal, outputVal }, setVal] = useState({
    inputVal: category === "temperature" ? -40 : 0,
    outputVal: category === "temperature" ? -40 : 0,
  });

  // Holds selected values in select fields.
  const [{ input, output }, setSelectState] = useState({
    input: Object.keys(formulas[category])[0],
    output: Object.keys(formulas[category])[1],
  });

  /**
   * Converts a given number from an initial unit to another.
   *
   * @param {Number} fromVal  Specifies number that will be converted.
   * @param {String} fromUnit Specifies current unit.
   * @param {String} toUnit   Specifies unit to convert to.
   */
  const getConversion = (fromVal, fromUnit, toUnit) => {
    return formulas[category][fromUnit][toUnit](fromVal);
  };

  useEffect(() => {
    setVal((currentState) => ({
      ...currentState,
      outputVal: getConversion(inputVal, input, output),
    }));
  }, [input, output]);

  /**
   * Returns a react-bootstrap select element with options dependent
   * on the component's category parameter.
   * @param {String} io  "input" or "output": Specifies which select
   *                     element to create and whether the "input"
   *                     or "output" default value should be set.
   */
  const options = (io) => (
    <Form.Control
      as="select"
      defaultValue={io === "input" ? input : output}
      onChange={(e) =>
        setSelectState((currentState) => ({
          ...currentState,
          [io]: e.target.value,
        }))
      }
    >
      {Object.keys(formulas[category]).map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </Form.Control>
  );

  return (
    <div className="internal-container">
      <div className="input-dropdown-container">
        <Form.Control
          type="number"
          min="0"
          value={inputVal}
          onChange={(e) => {
            setVal((currentState) => ({
              ...currentState,
              inputVal: e.target.value,
              outputVal: getConversion(e.target.value, input, output),
            }));
          }}
        />
        {options("input")}
      </div>
      <div className="equal-sign">=</div>
      <div className="input-dropdown-container">
        <Form.Control
          type="number"
          min="0"
          value={outputVal}
          onChange={(e) => {
            setVal((currentState) => ({
              ...currentState,
              outputVal: e.target.value,
              inputVal: getConversion(e.target.value, output, input),
            }));
          }}
        />
        {options("output")}
      </div>
    </div>
  );
};

export default ConversionForm;
