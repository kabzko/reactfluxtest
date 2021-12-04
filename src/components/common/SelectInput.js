import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
    let wrapperClase = "form-select";
    if (props.error && props.error.length > 0) {
        wrapperClase += " is-invalid";
    }
    return ( 
        <div className="mb-3">
            <label className="form-label" htmlFor={props.id}>{props.label}</label>
            <select 
                className={wrapperClase}
                id={props.id} 
                name={props.name}
                onChange={props.onChange} 
                value={props.value}
            >
                <option value="">{props.defaultOption}</option>
                {
                    props.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        );
                    })
                }
            </select>
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    )
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
}

TextInput.defaultProps = {
    error: ""
}

export default TextInput;