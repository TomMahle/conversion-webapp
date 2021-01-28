import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const App = () => {
    return(
        <div className="main-container">
            <div className="internal-container"> 
                <Form.Control type="number" />
                <Button>&larr;&rarr;</Button>
                <Form.Control type="number" />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));