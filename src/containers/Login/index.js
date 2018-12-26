import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const TargetComponent = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ './Login.jsx'),
    loading: Loader,
});

class Login extends Component {
    render() {
        return <TargetComponent/>;
    }
}

export default Login;
