import React, { useState, useEffect } from "react";
import CourseForm from "../components/CourseForm";
import * as courseApi from "../api/courseApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageCoursePage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    useEffect(() => {
        if (slug) {
            courseApi.getCourseBySlug(slug).then(course => setCourse(course)); 
        }
    }, [slug])

    function handleChange({target}) {
        const updatedCourse = {...course, [target.name]: target.value};
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
        courseApi.saveCourse(course).then(() => {
            navigate('/courses');
            toast.success("Course saved.");
        })
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

export default ManageCoursePage;