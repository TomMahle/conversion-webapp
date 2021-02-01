import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Form = () => {
    <div className="internal-container"> 
        <Form.Control type="number" min='0' />
        <Button>&larr;&rarr;</Button>
        <Form.Control type="number" min='0' />
    </div>
};