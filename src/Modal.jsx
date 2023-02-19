import React from "react";

export default function Modal({ children }) {
  return (
    <React.Fragment>
      <div className="modal-overlay"></div>
      <div className="modal-container">{children}</div>
    </React.Fragment>
  );
}
