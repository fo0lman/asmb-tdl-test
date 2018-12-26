import React, {Component} from 'react';
import {connect} from 'react-redux';
import {replace} from 'connected-react-router';

const mapStateToProps = state => ({
    isLoggedIn: state.getIn(['session', 'isLoggedIn'])
});

const requireAuth = TargetComponent => {
    class AuthentificatedComponent extends Component {
        componentWillMount() {
            this.checkAuth(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth = props => {
            if (!props.isLoggedIn) {
                props.replace({
                    pathname: '/login',
                    state: {
                        nextLocation: {
                            pathname: props.pathname,
                            search: props.search,
                        }
                    }
                });
            }
        };

        render() {
            const {isLoggedIn, ...otherProps} = this.props;

            return isLoggedIn && <TargetComponent {...otherProps} />;
        }
    }

    return connect(mapStateToProps, {replace})(AuthentificatedComponent);
};

export default requireAuth;
