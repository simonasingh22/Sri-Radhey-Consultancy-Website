import React from 'react';
import { Helmet } from 'react-helmet-async';
import PoliciesList from '../admin/pages/policies/PoliciesList';

export default function AdminPolicies() {
  return (
    <>
      <Helmet>
        <title>Policies | Sri Radhey Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PoliciesList />
    </>
  );
}
