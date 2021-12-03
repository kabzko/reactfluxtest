import React, { useState, useEffect } from "react";
import CourseForm from "../components/CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../redux/actions/courseActions";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

function ManageCoursePage(props) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({...props.course});

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courses.length === 0) {
            // courseActions.loadCourses();
        } else if (slug) {
            setCourse(courseStore.getCourseBySlug(slug));
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, slug])

    function onChange() {
        setCourses(courseStore.getCourses());
    }

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
        props.actions.saveCourse(course);
        navigate('/courses');
        toast.success("Course saved.")
    }

    return (
        <div className="container">
            <CourseForm 
                errors={errors}
                course={course} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
            />
        </div>
    )
}

ManageCoursePage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return { 
        courses: state.courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            saveCourse: bindActionCreators(courseActions.saveCourse, dispatch),
            // loadCourseBySlug: bindActionCreators(ReduxcourseActions, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);