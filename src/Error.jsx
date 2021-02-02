import React from "react";

const Error = ({ msg }) => {
  return (
    <div className="internal-container">
      <h1>{msg}</h1>
    </div>
  );
};

export default Error;
