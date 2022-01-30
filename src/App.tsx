import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadble from '@loadable/component';
const Login = loadble(() => import('@pages/Login'));
const SignUp = loadble(() => import('@pages/SignUp'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;