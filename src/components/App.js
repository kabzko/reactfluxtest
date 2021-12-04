import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursePage from "./CoursesPage";
import NotFoundPage from "./NotFoundPage";
import ManageCoursePage from "./ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (
        <>
            <ToastContainer autoClose={3000} />
            <Header />
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/about">
                    <AboutPage />
                </Route>
                <Route path="/courses">
                    <CoursePage />
                </Route>
                <Route path="/course/:slug">
                    <ManageCoursePage />
                </Route>
                <Route path="/course/">
                    <ManageCoursePage />
                </Route>
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    )
}

export default App;