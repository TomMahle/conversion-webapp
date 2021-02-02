import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import ConversionForm from "./ConversionForm.jsx";

const links = ["volume", "weight", "temperature"];

const App = () => {
  const path = window.location.pathname.toString();
  const [active, setActive] = useState(
    path == "/" ? "volume" : path.substring(1)
  );
  return (
    <Router>
      <div className="main-container">
        <Nav>
          {links.map((category, index) => (
            <Nav.Item key={index} eventkey={category}>
              <div
                key={index + 1}
                className={
                  active.includes(category)
                    ? "active-category-tab"
                    : "category-tab"
                }
                onClick={() => setActive(category)}
              >
                <Nav.Link key={category} href={category}>
                  {category}
                </Nav.Link>
              </div>
            </Nav.Item>
          ))}
        </Nav>
        <div className="mid-container">
          <Switch>
            <Route exact path="/">
              <Redirect to="/volume" />
            </Route>
            <Route path="/volume"></Route>
            <Route path="/weight"></Route>
            <Route path="/temperature"></Route>
          </Switch>
          <ConversionForm category={active} />
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
