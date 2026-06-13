import React from 'react';
import { Helmet } from 'react-helmet-async';
import PolicyForm from '../admin/pages/policies/PolicyForm';

export default function AdminPolicyForm() {
  return (
    <>
      <Helmet>
        <title>Policy Editor | Sri Radhey Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PolicyForm />
    </>
  );
}
