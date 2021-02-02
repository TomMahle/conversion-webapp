import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import Error from "./Error.jsx";
import ConversionForm from "./ConversionForm.jsx";

const links = ["volume", "mass", "temperature"];

const App = () => {
  return (
    <Router>
      <div className="main-container">
        <Nav>
          {links.map((category, index) => (
            <Nav.Item key={index} eventkey={category}>
              <div
                key={index + 1}
                className={
                  window.location.pathname.toString().includes(category)
                    ? "active-category-tab"
                    : "category-tab"
                }
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
            <Route path="/volume">
              <ConversionForm category={"volume"} />
            </Route>
            <Route path="/mass">
              <ConversionForm category={"mass"} />
            </Route>
            <Route path="/temperature">
              <ConversionForm category={"temperature"} />
            </Route>
            {/* https://ui.dev/react-router-v5-handling-404-pages/ */}
            <Route path="*">
              <Error msg={"Page not found."} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
