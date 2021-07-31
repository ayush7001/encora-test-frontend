import {combineReducers} from 'redux';
import userReducer from '../features/login/store/login.reducer';
import notesReducer from '../features/notes/store/notes.reducer';
import errorReducer from './error.reducer';
const rootReducer = combineReducers({
    user: userReducer,
    notes: notesReducer,
    error: errorReducer
})

export default rootReducer;