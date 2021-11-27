import React from "react";
import { Link } from "react-router-dom";

function CourseList(props){
    
    function renderRow() {
        return props.courses.map((course, index) => {
            return (
                <tr key={index}>
                    <td>
                        <Link to={`/course/${course.slug}`}>{course.title}</Link>
                    </td>
                    <td>{course.authorId}</td>
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

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author ID</th>
                    <th>Category</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {renderRow()}
            </tbody>
        </table>
    )
}

export default CourseList;