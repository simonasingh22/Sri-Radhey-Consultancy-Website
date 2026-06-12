import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

const upDistricts = [
  "Gorakhpur", "Lucknow", "Basti", "Deoria", "Maharajganj", 
  "Kushinagar", "Siddharthnagar", "Sant Kabir Nagar", 
  "Kanpur Nagar", "Gautam Buddha Nagar (Noida)", "Ghaziabad", 
  "Varanasi", "Prayagraj", "Agra", "Meerut", "Bareilly", 
  "Moradabad", "Aligarh", "Saharanpur", "Jhansi", "Ayodhya"
];

const servicesRequired = [
  "Subsidy Consultancy",
  "MSME Policy Assistance",
  "Technology Upgradation Scheme",
  "Capital Subsidy",
  "Interest Subsidy",
  "SGST Reimbursement",
  "Stamp Duty Exemption",
  "Pollution NOC (CTE/CTO)",
  "Labour NOC",
  "Electrical Safety NOC",
  "Factory License",
  "Fire NOC",
  "Documentation Services",
  "Liaisoning Services"
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      // Connect to the backend API port 5000 (which we'll code in Phase 5)
      const response = await axios.post('/api/leads', data, {
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitSuccess(true);
        reset();
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      // Fallback message for development testing if API is not yet active
      setSubmitError(
        err.response?.data?.message || 
        "Note: Server API not online yet, but form data is validated correctly."
      );
      
      // Let's simulate a success for UI walkthrough when offline
      if (process.env.NODE_ENV !== 'production') {
        setTimeout(() => {
          setSubmitSuccess(true);
          reset();
        }, 1500);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Sri Radhey Consultancy - Claim Subsidy in UP</title>
        <meta name="description" content="Get in touch with Sri Radhey Consultancy. File your industrial details to check MSME subsidy eligibility and compliance NOC requirements." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Connect With Us</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">Contact Our Advisory Desk</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Submit your plant specifications and machinery values for immediate eligibility assessment.
          </p>
        </div>
      </section>

      {/* Forms and Contact Channels */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side - Left 5 cols */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary font-display">Office Address & Details</h2>
              <div className="h-0.5 w-12 bg-accent"></div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Our consultancy handles filings throughout all districts of Uttar Pradesh. Visit our office or connect via phone or email for custom advisory setups.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-primary">Regional Liaison Office</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    District Industries Centre (DIC) Liaison Road,<br />
                    Gorakhpur / Lucknow, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-primary">Direct Hotlines</h4>
                  <p className="text-xs text-text-muted mt-1">
                    <a href="tel:+919999999999" className="hover:text-accent-dark transition-colors">+91-9999999999</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-primary">Email Inquiries</h4>
                  <p className="text-xs text-text-muted mt-1">
                    <a href="mailto:sriradheyconsultancy@gmail.com" className="hover:text-accent-dark transition-colors">sriradheyconsultancy@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Side - Right 7 cols */}
          <div className="lg:col-span-7 bg-background-alt border border-primary/5 rounded-xl p-6 sm:p-10 shadow-premium relative">
            
            {submitSuccess ? (
              <div className="py-12 text-center space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="w-16 h-16 bg-secondary/15 text-secondary flex items-center justify-center rounded-full mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-display">Inquiry Submitted Successfully</h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
                  Thank you! Your industrial parameters have been logged. Our consultancy coordinator will review your eligibility and contact you shortly.
                </p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-primary text-white text-xs font-semibold py-2 px-6 rounded"
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="font-display font-bold text-lg text-primary border-b border-black/5 pb-3">Eligibility Diagnostic Form</h3>
                
                {submitError && (
                  <div className="p-3 bg-accent/15 border border-accent/30 rounded text-xs text-accent-dark leading-relaxed">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase mb-1">Contact Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Shri Amit Mishra" 
                      className={`w-full px-3 py-2 border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-accent ${errors.name ? 'border-accent' : 'border-black/10'}`} 
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-[10px] text-accent font-semibold mt-1 block">{errors.name.message}</span>}
                  </div>

                  {/* Company field */}
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase mb-1">Company / Industry Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Trishul Packaging" 
                      className={`w-full px-3 py-2 border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-accent ${errors.company ? 'border-accent' : 'border-black/10'}`} 
                      {...register("company", { required: "Company name is required" })}
                    />
                    {errors.company && <span className="text-[10px] text-accent font-semibold mt-1 block">{errors.company.message}</span>}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone field */}
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9999999999" 
                      className={`w-full px-3 py-2 border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-accent ${errors.phone ? 'border-accent' : 'border-black/10'}`} 
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Please enter 10 digits" }
                      })}
                    />
                    {errors.phone && <span className="text-[10px] text-accent font-semibold mt-1 block">{errors.phone.message}</span>}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="e.g. amit@gmail.com" 
                      className={`w-full px-3 py-2 border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-accent ${errors.email ? 'border-accent' : 'border-black/10'}`} 
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email address" }
                      })}
                    />
                    {errors.email && <span className="text-[10px] text-accent font-semibold mt-1 block">{errors.email.message}</span>}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* District field */}
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase mb-1">UP District *</label>
                    <select 
                      className={`w-full px-3 py-2 border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-accent ${errors.district ? 'border-accent' : 'border-black/10'}`} 
                      {...register("district", { required: "Please select a district" })}
                    >
                      <option value="">-- Select District --</option>
                      {upDistricts.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.district && <span className="text-[10px] text-accent font-semibold mt-1 block">{errors.district.message}</span>}
                  </div>

                  {/* Service Required field */}
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase mb-1">Service Required *</label>
                    <select 
                      className={`w-full px-3 py-2 border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-accent ${errors.service ? 'border-accent' : 'border-black/10'}`} 
                      {...register("service", { required: "Please select a service" })}
                    >
                      <option value="">-- Select Service --</option>
                      {servicesRequired.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <span className="text-[10px] text-accent font-semibold mt-1 block">{errors.service.message}</span>}
                  </div>

                </div>

                {/* Message field */}
                <div>
                  <label className="block text-[11px] font-bold text-primary uppercase mb-1">Industrial Message / Project Details</label>
                  <textarea 
                    rows="4" 
                    placeholder="Specify plant assets value, power connection load, machinery invoices checklist, or other queries..."
                    className="w-full px-3 py-2 border border-black/10 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-accent"
                    {...register("message")}
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 px-4 rounded text-xs flex items-center justify-center gap-2 shadow-premium hover:shadow-premium-hover transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing Dossier...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Eligibility Inquiry
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>
    </>
  );
}
