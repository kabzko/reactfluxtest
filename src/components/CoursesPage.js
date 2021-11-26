import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "../components/CourseList";

function CoursePage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then(courses => setCourses(courses));
    }, [])

    return (
        <div className="container">
            <h2>Course Page</h2>
            <CourseList courses={courses} />
        </div>
    )
}

export default CoursePage;