import React from "react";
import "./Modal.css"
import ReactDom from "react-dom";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000
}

export default function Modal({open, children, onClose, onSubmit}) {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
          <div style={OVERLAY_STYLES} />
            <div id="modal">
                {children}
                <button onClick={onSubmit}>Yes</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </>,
        document.getElementById("portal")
    )
}