import actionTypes from "../actionTypes";
import * as courseApi from "../../api/courseApi";

export function saveCourse(course) {
    return function (dispatch) {
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ?
            dispatch({ type: actionTypes.UPDATE_COURSE, course: savedCourse }) :
            dispatch({ type: actionTypes.CREATE_COURSE, course: savedCourse })
        }).catch(error => {
            throw error;
        })
    }
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses().then(courses => {
            dispatch({ type: actionTypes.LOAD_COURSES, courses: courses });
        }).catch(error => {
            throw error;
        })
    }
}