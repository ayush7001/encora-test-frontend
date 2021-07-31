import * as actionTypes from '../../../store/action-types';
import httpService from '../../../shared/services/http-service';
import authService from '../../../shared/services/auth-service';
const login = (body) => {
    return  (dispatch) => {
        try {
            // dispatch({type: actionTypes.CHECK_ERROR_INIT});
            const loginSucess = httpService.post('/login', body, {headers: {'Content-Type': 'application/json'}}).then(loginSuccess => {
                authService.setAccessToken(loginSuccess.data.data.tsc);
                dispatch({type: actionTypes.LOGIN_SUCCESS, payload: {token: loginSuccess.data.data.tsc || ''}});
            }).catch((loginError) => {
                console.log(loginError.message)
                dispatch({type: actionTypes.CHECK_ERROR, payload: {message: loginError.message || ''}});
            });
        } catch (error) {
            // dispatch({type: actionTypes.CHECK_ERROR, payload: {message: error.message || ''}})
        }
    };
}

const onRefresh = () => {
    return (dispatch) => {
        if(authService.checkLogin()) {
            dispatch({type: actionTypes.LOGIN_SUCCESS, payload: {token: authService.getAccessToken()}})
        }
    }
}

export {login, onRefresh};