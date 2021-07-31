import * as actionTypes from '../../../store/action-types';
const initialState = {
    token: null,
    isLogin: false,
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_INIT:
            return {
                ...state,
            }
        case actionTypes.LOGIN_SUCCESS :
        return {
            ...state,
            token: action.payload.token,
            isLogin: true,
        }
        default :
        return state
    }
}

export default userReducer