import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./home/AboutPage";
import Header from "./common/Header";
import CoursePage from "./courses/CoursesPage";
import NotFoundPage from "./NotFoundPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (
        <>
            <ToastContainer autoClose={3000} />
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/courses" component={CoursePage} />
                <Route path="/course/:slug" component={ManageCoursePage} />
                <Route path="/course/" component={ManageCoursePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    )
}

export default App;