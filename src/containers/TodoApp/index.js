import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const TargetComponent = Loadable({
    loader: () => import(/* webpackChunkName: "todos-app" */ './TodoApp.jsx'),
    loading: Loader,
});

class TodoApp extends Component {
    render() {
        return <TargetComponent />;
    }
}

export default TodoApp;
