import React, { useEffect } from "react";
import CourseList from "../components/CourseList";
import { Link } from "react-router-dom";
import { loadCourses } from "../redux/actions/courseActions";
import { loadAuthors } from "../redux/actions/authorActions";
import { toast } from "react-toastify";
import Spinner from "../components/common/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function CoursePage({loadCourses, loadAuthors, courses, authors}) {

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

    function deleteSpecificCourse(id) {
        // deleteCourse(id).then(() => {
        //     toast.success("Course deleted.");
        // })
    }

    return (
        <div className="container">
            <h2>Course Page</h2>
            <Link className="btn btn-primary" to="/course">
                Add Course
            </Link>
            <Spinner />
            <CourseList courses={courses} deleteCourse={deleteSpecificCourse} />
        </div>
    )
}

CourseList.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
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
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);