import * as actionTypes from '../../../store/action-types';

const initialState = {
    notes: []
}

const notesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_NOTES_SUCCESS:
        return {
            ...state,
            notes: action.payload.notes
        }
        case actionTypes.FETCH_NOTES_SUCCESS:
        return {
            ...state,
            notes: action.payload.notes
        }
        case actionTypes.DELETE_NOTES_SUCCESS:
            return {
                ...state, 
                notes: action.payload.notes
            }
        default:
        return state
    }
}

export default notesReducer;