import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layout and Global components
import Layout from './components/Layout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Policies from './pages/Policies';
import PolicyDetail from './pages/PolicyDetail';
import Compliance from './pages/Compliance';
import Industries from './pages/Industries';
import SuccessStories from './pages/SuccessStories';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './admin/ProtectedRoute';
import LeadsList from './admin/pages/leads/LeadsList';
import LeadDetail from './admin/pages/leads/LeadDetail';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Routes - Wrapped in global Header/Footer Layout */}
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

          {/* Admin Routes - Standalone (No public layout) */}
          <Route path="/admin">
            <Route index element={<AdminLogin />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="leads" element={<ProtectedRoute><LeadsList /></ProtectedRoute>} />
            <Route path="leads/:id" element={<ProtectedRoute><LeadDetail /></ProtectedRoute>} />
          </Route>

          {/* 404 Fallback Route - Under Public Layout */}
          <Route path="*" element={<Layout />}>
            <Route index element={
              <div className="max-w-md mx-auto py-24 text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
                <p className="text-text-muted text-sm mb-6">The page you are looking for does not exist or has been moved.</p>
                <a href="/" className="bg-primary text-white text-xs font-semibold py-2.5 px-6 rounded shadow-premium">
                  Go Back Home
                </a>
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
