import actionTypes from "../actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses().then(courses => {
            dispatch({ type: actionTypes.LOAD_COURSES_SUCCESS, courses: courses });
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ?
            dispatch({ type: actionTypes.UPDATE_COURSE_SUCCESS, course: savedCourse }) :
            dispatch({ type: actionTypes.CREATE_COURSE_SUCCESS, course: savedCourse })
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}

export function deleteCourse(course) {
    return function(dispatch) {
        dispatch({ type: actionTypes.DELETE_COURSE_OPTIMISTIC, course });
        return courseApi.deleteCourse(course.id).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    };
}