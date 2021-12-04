import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

function CoursePage({
    loadCourses, 
    loadAuthors, 
    deleteCourse,
    courses, 
    authors, 
    loading
}) {

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(() => {
                console.log("Something went wrong. Please try again");
            })
        }
        if (authors.length === 0) {
            loadAuthors().catch(() => {
                console.log("Something went wrong. Please try again");
            })
        }
    }, [])

    const deleteSpecificCourse = async course => {
        try {
            await deleteCourse(course).then(() => {
                toast.success("Course deleted.");
            })
        } catch (error) {
            toast.error(`Delete failed. ${error.message}`, {autoClose: false});
        }
    }

    return (
        <div className="container">
            <h2>Course Page</h2>
            {
                loading 
                ? <Spinner /> 
                : 
                <>
                    <Link className="btn btn-primary" to="/course">
                        Add Course
                    </Link>
                    <CourseList courses={courses} deleteCourse={deleteSpecificCourse} />
                </>
            }
        </div>
    )
}

CoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return { 
        courses: 
            state.authors.length === 0 
            ? [] 
            : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(author => author.id === course.authorId).name
                }
            }),
        authors: state.authors,
        loading: state.apiCallStatusReducer > 0
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    deleteCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);