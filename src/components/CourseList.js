import React from "react";
import { Link } from "react-router-dom";

function CourseList(props){

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.courses.map((course, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <a className="btn btn-warning" href={`http://pluralsight.com/courses/${course.slug}`}>
                                        Watch
                                    </a>
                                </td>
                                <td>
                                    <Link to={`/course/${course.slug}`}>{course.title}</Link>
                                </td>
                                <td>{course.authorName}</td>
                                <td>{course.category}</td>
                                <td>
                                    <button 
                                    className="btn btn-danger" 
                                    onClick={() => props.deleteCourse(course.id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default CourseList;