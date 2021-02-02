import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { formulas } from './formulas.js';


const ConversionForm = ({category}) => {
    const [inputVal, setInputVal] = useState(0);
    const [outputVal, setOutputVal] = useState(0);
    const [{input, output}, setSelectState] = useState({"input": "", "output": ""});

    // maybe don't need this
    const swapValues = () => {
        var temp = outputVal;
        setOutputVal(inputVal);
        setInputVal(temp);
    };


    const options = (io) =>  (
        <Form.Control as="select" onChange={(e) => setSelectState(currentState => ({...currentState, [io]: e.target.value}))}>
            {Object.keys(formulas[category]).map((option, index) => {
                return <option key={index} value={option} >{option}</option>;
            })}
        </Form.Control>
    );

    return (
    <div className="internal-container"> 
        <div>
            <Form.Control type="number" min='0' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            {options("input")}
        </div>
        <Button onClick={() => swapValues()}>&larr;&rarr;</Button>
        <div>
            <Form.Control type="number" min='0' value={outputVal} onChange={(e) => setOutputVal(e.target.value)} />
            {options("output")}
        </div>
    </div>
    )};

export default ConversionForm;