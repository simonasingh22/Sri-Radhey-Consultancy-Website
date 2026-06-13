import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Layout from './components/Layout';
import ProtectedRoute from './admin/ProtectedRoute';
import { SettingsProvider } from './context/SettingsContext';

// Public Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Policies = lazy(() => import('./pages/Policies'));
const PolicyDetail = lazy(() => import('./pages/PolicyDetail'));
const Compliance = lazy(() => import('./pages/Compliance'));
const Industries = lazy(() => import('./pages/Industries'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));
const AdminPolicies = lazy(() => import('./pages/AdminPolicies'));
const AdminPolicyForm = lazy(() => import('./pages/AdminPolicyForm'));
const AdminBlogs = lazy(() => import('./pages/AdminBlogs'));
const AdminBlogForm = lazy(() => import('./pages/AdminBlogForm'));
const LeadsList = lazy(() => import('./admin/pages/leads/LeadsList'));
const LeadDetail = lazy(() => import('./admin/pages/leads/LeadDetail'));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-background text-primary">
      <div
        className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"
        aria-label="Loading page"
      />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <Router>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:slug" element={<ServiceDetail />} />
                <Route path="policies" element={<Policies />} />
                <Route path="policies/:slug" element={<PolicyDetail />} />
                <Route path="compliance" element={<Compliance />} />
                <Route path="industries" element={<Industries />} />
                <Route path="success-stories" element={<SuccessStories />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogDetail />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              <Route path="/admin">
                <Route index element={<AdminLogin />} />
                <Route path="login" element={<AdminLogin />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="leads"
                  element={
                    <ProtectedRoute>
                      <LeadsList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="leads/:id"
                  element={
                    <ProtectedRoute>
                      <LeadDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute>
                      <AdminSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="policies"
                  element={
                    <ProtectedRoute>
                      <AdminPolicies />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="policies/new"
                  element={
                    <ProtectedRoute>
                      <AdminPolicyForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="policies/:id/edit"
                  element={
                    <ProtectedRoute>
                      <AdminPolicyForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="blogs"
                  element={
                    <ProtectedRoute>
                      <AdminBlogs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="blogs/new"
                  element={
                    <ProtectedRoute>
                      <AdminBlogForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="blogs/:id/edit"
                  element={
                    <ProtectedRoute>
                      <AdminBlogForm />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="*" element={<Layout />}>
                <Route
                  index
                  element={
                    <div className="max-w-md mx-auto py-24 text-center">
                      <h1 className="text-4xl font-bold text-primary mb-4">
                        404 - Page Not Found
                      </h1>
                      <p className="text-text-muted text-sm mb-6">
                        The page you are looking for does not exist or has been moved.
                      </p>
                      <a
                        href="/"
                        className="bg-primary text-white text-xs font-semibold py-2.5 px-6 rounded shadow-premium"
                      >
                        Go Back Home
                      </a>
                    </div>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;