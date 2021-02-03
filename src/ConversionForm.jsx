import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import { formulas } from "./formulas.js";

const ConversionForm = ({ category }) => {
  const [{ inputVal, outputVal }, setVal] = useState({
    inputVal: category === "temperature" ? -40 : 0,
    outputVal: category === "temperature" ? -40 : 0,
  });
  const [{ input, output }, setSelectState] = useState({
    input: Object.keys(formulas[category])[0],
    output: Object.keys(formulas[category])[1],
  });

  const getConversion = (io, fromVal, fromUnit, toUnit) => {
    setVal((currentState) => ({
      ...currentState,
      [io + "Val"]: formulas[category][fromUnit][toUnit](fromVal),
    }));
  };

  useEffect(() => {
    getConversion("output", inputVal, input, output);
  }, [input]);

  useEffect(() => {
    getConversion("output", inputVal, input, output);
  }, [output]);

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
      <div>
        <Form.Control
          type="number"
          min={0}
          value={inputVal}
          onChange={(e) => {
            setVal((currentState) => ({
              ...currentState,
              inputVal: e.target.value,
            }));
            getConversion("output", e.target.value, input, output);
          }}
        />
        {options("input")}
      </div>
      <div className="equal-sign">=</div>
      <div>
        <Form.Control
          type="number"
          min={0}
          value={outputVal}
          onChange={(e) => {
            setVal((currentState) => ({
              ...currentState,
              outputVal: e.target.value,
            }));
            getConversion("input", e.target.value, output, input);
          }}
        />
        {options("output")}
      </div>
    </div>
  );
};

export default ConversionForm;
