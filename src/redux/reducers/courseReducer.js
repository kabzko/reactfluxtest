import actionTypes from "../actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case actionTypes.CREATE_COURSE:
            return [...state, { ...action.course }];
        case actionTypes.UPDATE_COURSE:
            return state.map(course => 
                course.id === action.course.id ? action.course : course
            );
        case actionTypes.LOAD_COURSES:
            return action.courses;
        default:
            return state;
    }
}