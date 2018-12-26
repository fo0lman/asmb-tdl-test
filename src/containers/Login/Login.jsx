import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {replace} from 'connected-react-router';

import {auth} from '../../actions';

import styles from './Login.scss';

const mapStateToProps = state => {
    const nextLocation = state.getIn(['router', 'location', 'state', 'nextLocation']);

    return {
        isLoggingIn: state.getIn(['session', 'isLoggingIn']),
        isLoggedIn: state.getIn(['session', 'isLoggedIn']),
        error: state.getIn(['session', 'error']),
        nextLocation: nextLocation && nextLocation.toJS()
    };
};

class Login extends Component {
    static propTypes = {
        isLoggingIn: PropTypes.bool.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        error: PropTypes.any,
        nextLocation: PropTypes.object,
        auth: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    };

    state = {
        login: '',
        password: ''
    };

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.redirectAuthentificatedUser(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn) {
            this.redirectAuthentificatedUser(nextProps);
        }
    }

    redirectAuthentificatedUser = props => {
        if (props.nextLocation) {
            this.props.replace(props.nextLocation);
        } else {
            this.props.replace('/');
        }
    }

    handleLoginChange = event => {
        this.setState({
            login: event.target.value
        });
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    }

    handleLogIn = event => {
        event.preventDefault();

        this.props.auth(this.state.login, this.state.password);
    }

    render() {
        const {error} = this.props;

        return (
            <div className={styles.root}>
                <h1 className={styles.logo}><i className="fa fa-tasks" /> To Do List</h1>
                <main className={styles.content}>
                    <form className={styles.form} onSubmit={this.handleLogIn}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Login"
                            value={this.state.login}
                            onChange={this.handleLoginChange}
                            required
                        />

                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            required
                        />

                        {
                            !error && <p className={styles.help}>Demo mode. Use <strong>admin/admin</strong> or <strong>user/user</strong> for credentials.</p>
                        }
                        {
                            error && <p className={styles.alert}>{error}</p>
                        }

                        <button type="submit" className={styles.btn}>Sign In</button>
                    </form>
                </main>
                <p className={styles.copyright}>Sergey Yarchuk &copy; 2018</p>
            </div>
        );
    }
}

export default connect(mapStateToProps, {auth, replace})(Login);
