import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
    courses, 
    authors, 
    loadCourses, 
    loadAuthors, 
    saveCourse, 
    history,
    ...props
}) {
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({...props.course});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(() => {
                alert("Something went wrong. Please try again");
            })
        } else {
            setCourse({ ...props.course });
        }
        if (authors.length === 0) {
            loadAuthors().catch(() => {
                alert("Something went wrong. Please try again");
            })
        }
    }, [props.course])

    function handleChange({target}) {
        const updatedCourse = {
            ...course, 
            [target.name]: target.name === "authorId" ? parseInt(target.value, 10) : target.value
        };
        setCourse(updatedCourse);
    }

    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};
        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Author is required";
        if (!category) errors.category = "Category is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            history.push('/courses');
            toast.success("Course saved.");
        }).catch(error => {
            setSaving(false);
            alert(error.message);
        });
    }

    return (
        <div className="container">
            {
                authors.length === 0 || course.length === 0
                ? <Spinner /> 
                : 
                <CourseForm 
                    errors={errors}
                    course={course} 
                    authors={authors}
                    onChange={handleChange} 
                    onSubmit={handleSubmit} 
                    saving={saving}
                />
            }
        </div>
    )
}

ManageCoursePage.propTypes = {
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0
    ? getCourseBySlug(state.courses, slug)
    : newCourse;
    return { 
        course: course,
        courses: state.courses,
        authors: state.authors,
    }
}

const mapDispatchToProps = {
    loadAuthors,
    loadCourses,
    saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);