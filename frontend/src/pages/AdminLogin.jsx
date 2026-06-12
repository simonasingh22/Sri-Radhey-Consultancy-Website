import React from 'react';
import { Helmet } from 'react-helmet-async';
import Login from '../admin/pages/Login';

export default function AdminLogin() {
  return (
    <>
      <Helmet>
        <title>Admin Portal Login | Sri Radhey Consultancy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Login />
    </>
  );
}
