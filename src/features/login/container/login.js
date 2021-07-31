import React from 'react';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import {Formik, Field} from 'formik';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button/Button';
import '../component/login.scss';
import Snackbar from '@material-ui/core/Snackbar';
import * as commonActions from '../../../store/commonActions'
import {login} from '../store/login.action';
import { Redirect } from 'react-router-dom';
const LoginContainer = (props) => {
        if(props.isLogin) {
            return <Redirect to="/home" />
        }
        return (
            <Container>
                <Grid xs={12}  className="login-container">
                    <Grid xs={12} xl={6} sm={6} md={6}  className="form">
                        <h1>Login </h1>
                            <Formik 
                                initialValues={{email: "", password: ""}}
                                onSubmit={(values) =>  props.login(values)}
                            >
                                {({values, handleSubmit, setFieldValue}) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <Grid xs={12} className="form-input" item>
                                                <Field name="email"   render={(field) => 
                                                    <TextField label="Email" variant="outlined" 
                                                    className="input" onChange={(e) => setFieldValue("email", e.target.value)} placeholder="please enter username or email" type="email"/>}
                                                />
                                                <Field name="password"  render={(field) => 
                                                    <TextField label="Password" onChange={(e) => setFieldValue("password", e.target.value)}  variant="outlined" className="input" placeholder="please enter password" type="password"/>}
                                                />
                                                
                                            </Grid>
                                            <Grid xs={12} className="login-button" item>
                                                <Button variant="contained" type="submit" color="primary"> Login </Button>
                                            </Grid>
                                        </form>
                                    )
                                }}
                            </Formik>
                        
                    </Grid>
                    <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={props.error.isError}
                    onClose={props.cleanError}
                    message={props.error.message}
                    key={'error'}
                />
                </Grid>
            </Container>
        )
}

const mapStateToProps = (state) => {
    return {
        ...state.user,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (body) =>  dispatch(login(body)),
        cleanError: () =>  dispatch(commonActions.cleanError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);