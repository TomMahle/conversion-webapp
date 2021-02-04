import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";

import Error from "./Error.jsx";
import ConversionForm from "./ConversionForm.jsx";

// routes based on conversion categories
const links = ["volume", "mass", "temperature"];

/**
 * Base app component.
 */
const App = () => {
  // Holds boolean for alert.
  const [show, setShow] = useState(false);

  // Holds message for alert.
  const [alertMessage, setAlertMessage] = useState("");

  // useRef for timeout referenced from ZiiMakc:
  // https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals
  const alertTimeout = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(alertTimeout.current);
    };
  }, []);

  /**
   * Sets message to be displayed in alert.
   *
   * @param {String} msg Message to display in alert.
   */
  const updateAlertMessage = (msg) => {
    setAlertMessage(msg);
  };

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

  return (
    <Router>
      <div className="main-container">
        <div className="main-title-container">
          <Alert id="form-alert" show={show}>
            {alertMessage}
          </Alert>
          <h1 className="main-title">
            <span className="title-first-letter">u</span>nit{" "}
            <span className="title-first-letter">c</span>onverter
          </h1>
        </div>
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
              <ConversionForm
                showAlert={showAlert}
                updateAlertMessage={updateAlertMessage}
                category={"volume"}
              />
            </Route>
            <Route path="/mass">
              <ConversionForm
                showAlert={showAlert}
                updateAlertMessage={updateAlertMessage}
                category={"mass"}
              />
            </Route>
            <Route path="/temperature">
              <ConversionForm
                showAlert={showAlert}
                updateAlertMessage={updateAlertMessage}
                category={"temperature"}
              />
            </Route>
            {/* Handling 404 with react-router: https://ui.dev/react-router-v5-handling-404-pages/ */}
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
