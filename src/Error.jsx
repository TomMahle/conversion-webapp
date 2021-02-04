import React from "react";

/**
 * Component for displaying errors, like a 404 response.
 *
 * @param {String} msg custom message
 */
const Error = ({ msg }) => {
  return (
    <div className="internal-container">
      <h1>{msg}</h1>
    </div>
  );
};

export default Error;
