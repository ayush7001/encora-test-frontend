import * as actionTypes from './action-types';
const initialState = {
    isError: null,
    message: ''
}

const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHECK_ERROR:
            return {
                ...state,
                isError: true,
                message: action.payload.message
            }
        case actionTypes.CHECK_ERROR_INIT:
            return {
                ...state,
                isError: null,
                message: ''
            }
        default:
            return state;
    }
}

export default errorReducer;