import React from "react";
import Option from "./Option";


const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button
        onClick={props.handleDeleteOptions}
        className="button button--link"
      >
        Remove All
      </button>
    </div>
    {props.options.length === 0 && 
      <p className="widget__message">Add some options below.</p>
    }
    {
      props.options.map((option, index) =>
        <Option
          key={option}
          handleDeleteOption={props.handleDeleteOption}
          count={index + 1}
          optionText={option} />
      )
    }
  </div>
)

export default Options;