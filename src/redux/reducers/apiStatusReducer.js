import actionTypes from "../actionTypes";
import initialState from "./initialState";

function actionTypesEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
    if (action.type === actionTypes.BEGIN_API_CALL) {
        return state + 1;
    } else if (actionTypesEndsInSuccess(action.type)) {
        return state - 1;
    }
    return state;
}