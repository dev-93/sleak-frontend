import * as React from 'react';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import { Routes, Route, Navigate } from 'react-router-dom';

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
