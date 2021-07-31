import React from 'react';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import * as commonActions from '../store/commonActions'
class Layout extends React.Component {
    state = {}
    static getDerivedStateFromProps(props, state)  {
        if(props.error.isError) {
            setTimeout(() => {
                props.cleanError()
            }, 5000);
            return null
        }
        return null
    }
    render() {
        return (
            <div>
                <div className="header-section">

                </div>
                <div className="main-section">
                    {this.props.children}
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.error.isError}
                    onClose={this.props.cleanError}
                    message={this.props.error.message}
                    key={'error'}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cleanError: () =>  dispatch(commonActions.cleanError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);