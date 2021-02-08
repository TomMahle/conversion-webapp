import React from "react";
import { shallow } from "enzyme";
import "../src/setupTest.js";

import App from "../src/App.jsx";

it("renders without crashing", () => {
  shallow(<App />);
});
