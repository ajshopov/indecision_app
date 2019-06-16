import React from "react";
import Modal from "react-modal";

const OptionModal = (props) => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleSelectedOption}
    ariaHideApp={false}
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className="modal__title">Decidor Has Chosen:</h3>
    {
      props.selectedOption && 
      <p className="modal__body" >{props.selectedOption}</p>
    }
    <button 
      onClick={() => {props.handleSelectedOption();}}
    >
      OK
    </button>
  </Modal>
);

export default OptionModal;