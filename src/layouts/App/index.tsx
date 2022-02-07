import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadble from '@loadable/component';

const Login = loadble(() => import('@pages/Login'));
const SignUp = loadble(() => import('@pages/SignUp'));
const Workspace = loadble(() => import('@layouts/Workspace'));
const Channel = loadble(() => import('@pages/Channel'));
const DirectMessage = loadble(() => import('@pages/DirectMessage'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/:workspace" element={<Workspace />}>
        <Route path="/workspace/:workspace/channel/:channel" element={<Channel />} />
        <Route path="/workspace/:workspace/dm/:id" element={<DirectMessage />} />
      </Route>
    </Routes>
  );
};

export default App;
