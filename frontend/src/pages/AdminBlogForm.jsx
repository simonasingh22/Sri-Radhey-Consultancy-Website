import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogForm from '../admin/pages/blogs/BlogForm';

export default function AdminBlogForm() {
  return (
    <>
      <Helmet>
        <title>Blog Editor | Sri Radhey Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <BlogForm />
    </>
  );
}
