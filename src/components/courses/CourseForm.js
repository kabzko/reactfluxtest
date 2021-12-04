import React from "react";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import PropTypes from "prop-types";

function CourseForm({
    onSubmit,
    onChange,
    course,
    errors,
    authors,
    saving
}) {
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <TextInput
                    id="title"
                    name="title"
                    label="Title"
                    onChange={onChange}
                    value={course.title}
                    error={errors.title}
                />
                <SelectInput 
                    id="authorId"
                    name="authorId"
                    label="Author"
                    onChange={onChange}
                    value={course.authorId || ""}
                    defaultOption="Select Author"
                    options={authors.map(author => ({
                        value: author.id,
                        text: author.name
                    }))}
                    error={errors.title}
                />
                <TextInput
                    id="category"
                    name="category"
                    label="Category"
                    onChange={onChange}
                    value={course.category}
                    error={errors.category}
                />
                <button type="submit" disabled={saving} className="btn btn-primary">
                    {saving ? "Saving..." : "Save"}
                </button>
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