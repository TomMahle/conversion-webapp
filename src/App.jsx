import React, { useState } from 'react';
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

const links = {
    "volume": "/volume",
    "weight": "/weight",
    "temperature": "/temperature"
};

const App = () => {
    const [active, setActive] = useState(window.location.toString());
    return(
        <div className="main-container">
            <div className="mid-container">
                <Router>
                    <Nav variant="tabs" defaultActiveKey="/home">
                        {Object.keys(links).map((item, index) => (
                            <Nav.Item key={index}>
                                <div key={index + 1} className={active.includes(item) ? "active-category-tab": "category-tab"}>
                                    <Link key={index + 2} to={links[item]} onClick={() => setActive(item)}> {item} </Link>
                                </div>
                            </Nav.Item>
                        ))}
                        {/* <Nav.Item >
                            <div className={active.includes("volume") ? "active-category-tab": "category-tab"}>
                                <Link to="/volume" onClick={() => setActive("volume")}> Volume </Link>
                            </div>
                        </Nav.Item>
                        <Nav.Item>
                            <div className={active.includes("weight") ? "active-category-tab": "category-tab"}>
                                <Link to="/weight" onClick={() => setActive("weight")}> Weight </Link>
                            </div>
                        </Nav.Item>
                        <Nav.Item >
                            <div className={active.includes("temperature") ? "active-category-tab": "category-tab"}>
                                <Link to="/temperature" onClick={() => setActive("temperature")}> Temperature </Link>
                            </div>
                        </Nav.Item> */}
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