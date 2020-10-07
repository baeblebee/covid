import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Main from '../pages/Main';
export default function Routes() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/cadastrar" component={Cadastro} />

            <Route path="/" exact component={Main} isPrivate />
        </Switch>
    );
}