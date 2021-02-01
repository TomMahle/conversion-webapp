import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom"; 

import Form from "./Form.jsx";

import Nav from "react-bootstrap/Nav";

const links = ["volume", "weight", "temperature"];

const App = () => {
    const path = window.location.pathname.toString();
    const [active, setActive] = useState(path == "/" ? "volume" : path);
    return(
        <Router>
            <div className="main-container">
                <Nav>
                {links.map((category, index) => (
                    <Nav.Item key={index} eventkey={category}>
                        <div 
                            key={index + 1} 
                            className={active.includes(category) ? "active-category-tab" : "category-tab"} 
                            onClick={() => setActive(category)}>
                            <Nav.Link key={category} href={category}>{category}</Nav.Link>
                        </div>
                    </Nav.Item>
                ))}
                </Nav>
                <div className="mid-container">
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
                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));