import actionTypes from "../actionTypes";
import * as authorApi from "../../api/authorApi";

export function loadAuthors() {
    return function (dispatch) {
        return authorApi.getAuthors().then(authors => {
            dispatch({ type: actionTypes.LOAD_AUTHORS, authors: authors });
        }).catch(error => {
            throw error;
        })
    }
}