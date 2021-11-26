import React from "react";
import { Link } from "react-router-dom";

function CourseList(props){
    
    function renderRow() {
        return props.courses.map(course => {
            return (
                <tr key={course.id}>
                    <td>
                        <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                    </td>
                    <td>{course.authorId}</td>
                    <td>{course.category}</td>
                </tr>
            )
        })
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author ID</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {renderRow()}
            </tbody>
        </table>
    )
}

export default CourseList;