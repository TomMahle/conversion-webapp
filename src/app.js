import React from 'react';
import ReactDOM from 'react-dom';
// https://reactrouter.com/web/guides/quick-start
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom"; 

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

const App = () => {
    return(
        <div className="main-container">
            <div className="mid-container">
                <Router>
                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Link to="/volume">Volume</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/weight">Weight</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/temperature">Temperature</Link>
                        </Nav.Item>
                    </Nav>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/volume" />
                        </Route>
                        <Route path="/volume">
                            <div className="internal-container"> 
                                <Form.Control type="number" min='0' />
                                <Button>&larr;&rarr;</Button>
                                <Form.Control type="number" min='0' />
                            </div>
                        </Route>
                        <Route path="/weight">
                            <div className="internal-container"> 
                                <Form.Control type="number" min='0' />
                                <Button>&larr;&rarr;</Button>
                                <Form.Control type="number" min='0' />
                            </div>
                        </Route>
                        <Route path="/temperature">
                            <div className="internal-container"> 
                                <Form.Control type="number" min='0' />
                                <Button>&larr;&rarr;</Button>
                                <Form.Control type="number" min='0' />
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));