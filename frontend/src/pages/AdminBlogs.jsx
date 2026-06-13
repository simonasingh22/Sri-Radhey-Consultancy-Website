import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogsList from '../admin/pages/blogs/BlogsList';

export default function AdminBlogs() {
  return (
    <>
      <Helmet>
        <title>Blogs | Sri Radhey Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <BlogsList />
    </>
  );
}
