import * as actionTypes from './action-types';

const cleanError = () => {
    return (dispatch => {
        dispatch({type: actionTypes.CHECK_ERROR_INIT})
    })
}

export {cleanError}