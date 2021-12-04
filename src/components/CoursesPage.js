import React, { useState, useEffect } from "react";
import CourseList from "../components/CourseList";
import courseStore from "../stores/courseStore";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { toast } from "react-toastify";

function CoursePage() {
    const [courses, setCourses] = useState(courseStore.getCourses());

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courseStore.getCourses().length === 0) loadCourses();
        return () => courseStore.removeChangeListener(onChange);
    }, [])

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    function deleteSpecificCourse(id) {
        deleteCourse(id).then(() => {
            toast.success("Course deleted.");
        })
    }

    return (
        <div className="container">
            <h2>Course Page</h2>
            <Link className="btn btn-primary" to="/course">
                Add Course
            </Link>
            <CourseList courses={courses} deleteCourse={deleteSpecificCourse} />
        </div>
    )
}

export default CoursePage;