import React from 'react';
import { Helmet } from 'react-helmet-async';
import Settings from '../admin/pages/Settings';

export default function AdminSettings() {
  return (
    <>
      <Helmet>
        <title>Settings | Sri Radhey Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Settings />
    </>
  );
}
