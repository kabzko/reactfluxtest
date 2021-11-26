import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursePage from "./CoursesPage";
import NotFoundPage from "./NotFoundPage";
import ManageCoursePage from "./ManageCoursePage";

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" exact element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/courses" element={<CoursePage />} />
                <Route path="/courses/:slug" element={<ManageCoursePage />} />
            </Routes>
        </>
    )
}

export default App;