import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {

    return (
        <div className="container">
            <h2>404 NOT FOUND</h2>
            <Link to="/">Go Home</Link>
        </div>
    )
}

export default NotFoundPage;