import * as actionTypes from '../../../store/action-types';
import httpService from '../../../shared/services/http-service';
import authService from '../../../shared/services/auth-service';
const addNotes = body => {
    return (async(dispatch, getState) => {
        try {
            const existingNotes = getState().notes.notes;
            dispatch({ type: actionTypes.CHECK_ERROR_INIT });
            const noteData = await httpService.post('/notes/add', body, {headers: {
                'Content-Type': 'application/json', 'x-access-token': authService.getAccessToken()
            }});
            if(noteData.data.isError) {
                dispatch({ type: actionTypes.CHECK_ERROR, payload: {message: noteData.data.message || ''}})
            } else {
                existingNotes.push(noteData.data.data.note);
                dispatch({ type: actionTypes.ADD_NOTES_SUCCESS, payload: {notes: existingNotes || ''}})
            }
        } catch (error) {
            console.log(error)
            dispatch({type: actionTypes.CHECK_ERROR, payload: {message: error.message || ''}})
        }
    })
}

const fetchNotes = () => {
    return (async(dispatch, getState) => {
        try {
            
            const noteData = await httpService.get('/notes', {headers: {
                'Content-Type': 'application/json', 'x-access-token': authService.getAccessToken()
            }});
            if(noteData.data.isError) {
                
                dispatch({type: actionTypes.CHECK_ERROR, payload: {message: noteData.data.message || ''}})
            } else {
                
                dispatch({type: actionTypes.ADD_NOTES_SUCCESS, payload: {notes: noteData.data.data.list || ''}})
            }
        } catch (error) {
            dispatch({type: actionTypes.CHECK_ERROR, payload: {message: error.message || ''}})
        }
    })
}


const deleteNotes = id => {
    return (async(dispatch, getState) => {
        try {
            const existingNotes = getState().notes.notes;
            dispatch({ type: actionTypes.CHECK_ERROR_INIT });
            const noteData = await httpService.delete(`/notes/${id}`, {headers: {
                'Content-Type': 'application/json', 'x-access-token': authService.getAccessToken()
            }});
            if(noteData.data.data.isError) {
                dispatch({ type: actionTypes.CHECK_ERROR, payload: {message: noteData.data.data.message || ''}})
            } else {
                const index = existingNotes.findIndex(ob =>  ob._id === id);
                if(index  > -1) {
                    existingNotes.splice(index, 1);
                }
                dispatch({ type: actionTypes.DELETE_NOTES_SUCCESS, payload: {notes: existingNotes || ''}})
            }
        } catch (error) {
            dispatch({type: actionTypes.CHECK_ERROR, payload: {message: error.message || ''}})
        }
    })
}




export {addNotes, fetchNotes, deleteNotes}