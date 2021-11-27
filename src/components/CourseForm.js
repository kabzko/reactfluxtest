import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function CourseForm(props) {
    return (
        <div className="container">
            <form onSubmit={props.onSubmit}>
                <TextInput
                    id="title"
                    name="title"
                    label="Title"
                    onChange={props.onChange}
                    value={props.course.title}
                    error={props.errors.title}
                />
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <select 
                    className={props.errors.authorId ? "form-select is-invalid" : "form-select"} 
                    name="authorId"
                    onChange={props.onChange} 
                    value={props.course.authorId || ""}>
                        <option value=""></option>
                        <option value="1">Cory House</option>
                        <option value="2">Scot Allen</option>
                    </select>
                    <div className="invalid-feedback">
                        {props.errors.authorId}
                    </div>
                </div>
                <TextInput
                    id="category"
                    name="category"
                    label="Category"
                    onChange={props.onChange}
                    value={props.course.category}
                    error={props.errors.category}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

export default CourseForm;