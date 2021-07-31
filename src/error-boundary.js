import React from 'react';

class ErrorBoundary   extends React.Component{
    state = {
		error: null
	};
	static getDerivedStateFromError(error) {
		return { error };
	}

	componentDidMount() {
		//window.onerror = this.logError;
	}
	componentDidCatch(error, info) {
		this.logError(error);
	}

	logError(args) {
		console.log(args);
	}


    render() {
		if (this.state.error) {
			return 'Application has errors. Please check logs to fix this';
		}
		return this.props.children;
	}
}

export default ErrorBoundary;