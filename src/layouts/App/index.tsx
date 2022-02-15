import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import loadble from '@loadable/component';

const Login = loadble(() => import('@pages/Login'));
const SignUp = loadble(() => import('@pages/SignUp'));
const Workspace = loadble(() => import('@layouts/Workspace'));

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/:workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
