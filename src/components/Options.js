import React from "react";
import Option from "./Option";


const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>remove all</button>
            {props.options.length === 0 && <p>Add an option...</p>}
            {
                props.options.map((option) =>
                    <Option
                        key={option}
                        handleDeleteOption={props.handleDeleteOption}
                        optionText={option} />
                )
            }
        </div>
    );
}

export default Options;