import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const TargetComponent = Loadable({
    loader: () => import(/* webpackChunkName: "logout" */ './Logout.jsx'),
    loading: Loader,
});

class Logout extends Component {
    render() {
        return <TargetComponent/>;
    }
}

export default Logout;
