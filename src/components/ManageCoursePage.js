import React, { useState, useEffect } from "react";
import CourseForm from "../components/CourseForm";
import { loadCourses, saveCourse } from "../redux/actions/courseActions";
import { loadAuthors } from "../redux/actions/authorActions";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function ManageCoursePage({courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props}) {
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({...props.course});

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(() => {
                alert("Something went wrong. Please try again");
            })
        }
        if (authors.length === 0) {
            loadAuthors().catch(() => {
                alert("Something went wrong. Please try again");
            })
        }
    }, [])

    function handleChange({target}) {
        const updatedCourse = {
            ...course, 
            [target.name]: target.name === "authorId" ? parseInt(target.value, 10) : target.value
        };
        setCourse(updatedCourse);
    }

    function formIsValid() {
        const _errors = {};
        if (!course.title) _errors.title = "Title is required";
        if (!course.authorId) _errors.authorId = "Author is required";
        if (!course.category) _errors.category = "Category is required";
        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        saveCourse(course).then(() => {
            history.push('/courses');
            toast.success("Course saved.");
        });
    }

    return (
        <div className="container">
            <CourseForm 
                errors={errors}
                course={course} 
                authors={authors}
                onChange={handleChange} 
                onSubmit={handleSubmit} 
            />
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
    history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps);
    // const newCourse = {
    //     id: null,
    //     title: "",
    //     authorId: null,
    //     category: ""
    // };
    // const course = slug && state.courses.length > 0
    // ? getCourseBySlug(state.courses, slug)
    // : newCourse;
    const course = [];
    return { 
        course,
        courses: state.courses,
        authors: state.authors
    }
}

const mapDispatchToProps = {
    loadAuthors,
    loadCourses,
    saveCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);