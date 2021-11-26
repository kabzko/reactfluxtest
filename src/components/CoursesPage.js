import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "../components/CourseList";
import { Link } from "react-router-dom";

function CoursePage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then(courses => setCourses(courses));
    }, [])

    return (
        <div className="container">
            <h2>Course Page</h2>
            <Link className="btn btn-primary" to="/course">
                Add Course
            </Link>
            <CourseList courses={courses} />
        </div>
    )
}

export default CoursePage;