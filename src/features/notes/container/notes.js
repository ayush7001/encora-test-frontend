import React from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import {Formik} from 'formik';

import * as notesActions from '../store/notes.actions';
import TransitionsModal from '../../../shared/components/modal';

import "../component/notes.scss";
class NotesContainer extends React.Component {
    state = {
        isModal: false,
        selectedId: null
    }

    handleDelete = (obj) => {
        this.setState({
            isModal: true,
            selectedId: obj._id
        })
    }

    componentDidMount () {
        this.props.fetchNotes();
    }

    render() {
        return (
            <Grid item>
                <Grid xl={12} sm={12} xs={12} className={"header"} item>
                    G Notes
                </Grid>
                <Grid xl={12} sm={12} xs={12} className="notes-section" item>
                    <Grid lg={3} sm={12} xs={12} md={12} className={"notes-list"} item>
                        {
                            !!this.props.notes.notes.length && this.props.notes.notes.map((obj, index) =>{
                                return (
                                    <Container key={index} className="note">
                                        <Grid>
                                            <Grid className="note-heading">
                                                <h4>{obj.title}</h4>
                                                <span onClick={() =>this.handleDelete(obj)}>x</span>
                                            </Grid>
                                            <p>{obj.body}</p>
                                        </Grid>
                                    </Container>
                                )
                            })
                        }
                    </Grid>

                    <Grid  lg={9} sm={12} xs={12} md={12} className="note-form" item>
                        <Container>
                            <Formik
                                initialValues={{body: '', title: ''}}
                                
                            >
                                {({values, handleSubmit, setFieldValue, handleReset}) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div className="text-input title">
                                                <label htmlFor="title">Title: </label>
                                                <TextField label="Title" variant="filled"  id="title" name="title" value={values.title} onChange={(e) => setFieldValue("title", e.target.value)}  />
                                            </div>
                                            <div className="text-input title">
                                                <label htmlFor="body">Body: </label>
                                                <TextField label="Body" id="body"  variant="filled"  multiline={true} minRows={12} name="body" value={values.body} onChange={(e) => setFieldValue("body", e.target.value)}/>
                                            </div>
                                            <Button color="primary" variant="contained" className="btn" type="button"  onClick={() => {this.props.addNotes(values); handleReset({title: "", body: ""})}}>Save</Button>
                                        </form>
                                    )
                                }}
                            </Formik>
                            
                        </Container>
                    </Grid>
                    {
                        this.state.isModal && <TransitionsModal 
                            open={this.state.isModal}
                            handleConfirmation={() =>  {
                                this.props.deleteNotes(this.state.selectedId);
                                this.setState({isModal: false, selectedId: null})
                            }}
                            message={"Are you sure you want to delete this record?"}
                            handleClose={() =>  this.setState({isModal: false, selectedId: null})}
                        />
                    }
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNotes: (body) => dispatch(notesActions.addNotes(body)),
        fetchNotes: () =>  dispatch(notesActions.fetchNotes()),
        deleteNotes: (id) => dispatch(notesActions.deleteNotes(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);