import React from 'react'
import "./Modal.css";

export const Modal = ({setOpenModal, children}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            id='cancelBtn'
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        
        {children}
        {/* <div className="footer">
        
          <button>Continue</button>
        </div> */}
      </div>
    </div>
  );
}

export default Modal;