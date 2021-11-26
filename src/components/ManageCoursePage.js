import React from "react";
import { useParams } from "react-router-dom";

function ManageCoursePage() {
    const { slug } = useParams();

    return (
        <div className="container">
            <h1>{slug}</h1>
        </div>
    )
}

export default ManageCoursePage;