import actionTypes from "../actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return authorApi.getAuthors().then(authors => {
            dispatch({ type: actionTypes.LOAD_AUTHORS_SUCCESS, authors: authors });
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}