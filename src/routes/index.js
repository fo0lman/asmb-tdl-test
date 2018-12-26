import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import requireAuth from '../hoc/auth';

import Login from '../containers/Login';
import Logout from '../containers/Logout';

import TodoApp from '../containers/TodoApp/TodoApp';

const routes = (
    <div>
        <Switch>
            <Redirect exact from="/" to="/todos/all"/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/todos/:filter" component={requireAuth(TodoApp)}/>
        </Switch>
    </div>
);

export default routes;
