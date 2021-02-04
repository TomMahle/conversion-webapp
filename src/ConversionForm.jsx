import React, { useEffect, useState, useRef } from "react";

import Alert from "react-bootstrap/Alert";
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

  // Holds boolean for alert.
  const [show, setShow] = useState(false);

  // useRef for timeout referenced from ZiiMakc:
  // https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals
  const alertTimeout = useRef(null);

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
    return () => {
      clearTimeout(alertTimeout.current);
    };
  }, [input, output]);

  /**
   * Shows alert for two seconds.
   *
   * setTimeout functionality referenced from
   * Andrei Duca: https://stackoverflow.com/questions/56267322/react-hooks-settimeout-after-setstate/56270973
   */
  const showAlert = () => {
    setShow(true);
    alertTimeout.current = setTimeout(() => {
      setShow(false);
    }, 2000);
  };

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

  /**
   * Handles onChange for number input fields.
   *
   * @param {String} fromField "inputVal" or "outputVal": set to entered value.
   * @param {String} toField   "inputVal" or "outputVal": set to calculated value.
   * @param {Number} fromVal   Specifies number that will be converted.
   * @param {String} fromUnit  Specifies current unit.
   * @param {String} toUnit    Specifies unit to convert to.
   */
  const handleChange = (fromField, toField, fromVal, fromUnit, toUnit) => {
    if (!(category === "temperature") && Number(fromVal) < 0) {
      setVal({
        [fromField]: fromVal * -1,
        [toField]: getConversion(fromVal * -1, fromUnit, toUnit),
      });
      showAlert();
    } else {
      setVal({
        [fromField]: fromVal,
        [toField]: getConversion(fromVal, fromUnit, toUnit),
      });
    }
  };

  return (
    <>
      <Alert id="form-alert" show={show}>
        Positive numbers only
      </Alert>
      <div className="internal-container">
        <div className="input-dropdown-container">
          <Form.Control
            type="number"
            min="0"
            value={inputVal}
            onChange={(e) =>
              handleChange(
                "inputVal",
                "outputVal",
                e.target.value,
                input,
                output
              )
            }
            onClick={(e) => (e.target.value == 0 ? e.target.select() : null)}
          />
          {options("input")}
        </div>
        <div className="equal-sign">=</div>
        <div className="input-dropdown-container">
          <Form.Control
            type="number"
            min="0"
            value={outputVal}
            onChange={(e) =>
              handleChange(
                "outputVal",
                "inputVal",
                e.target.value,
                output,
                input
              )
            }
            onClick={(e) => (e.target.value == 0 ? e.target.select() : null)}
          />
          {options("output")}
        </div>
      </div>
    </>
  );
};

export default ConversionForm;
