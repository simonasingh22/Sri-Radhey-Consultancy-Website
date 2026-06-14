import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SEO, { SITE_URL, createOrganizationSchema } from '../components/SEO';

const upDistricts = [
  "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya",
  "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur",
  "Banda", "Bara Banki", "Bareilly", "Basti", "Bhadohi", "Bijnor",
  "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah",
  "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar",
  "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur",
  "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj",
  "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri",
  "Kushinagar", "Lalitpur", "Lucknow", "Mahoba", "Mahrajganj", "Mainpuri",
  "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar",
  "Pilibhit", "Pratapgarh", "Prayagraj", "Rae Bareli", "Rampur",
  "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli",
  "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur",
  "Unnao", "Varanasi"
];

const industryTypes = [
  'Manufacturing',
  'Food Processing',
  'Packaging',
  'Textile / Garments',
  'Engineering / Fabrication',
  'Chemical Industry',
  'Pharmaceuticals',
  'Electronics',
  'Plastic / Polymer',
  'Cold Storage',
  'Rice Mill / Flour Mill',
  'Furniture / Wood Products',
  'Printing / Paper Products',
  'Other',
];

const servicesRequired = [
  'Subsidy Consultancy',
  'MSME Policy Assistance',
  'Technology Upgradation Scheme',
  'Capital Subsidy',
  'Interest Subsidy',
  'SGST Reimbursement',
  'Stamp Duty Exemption',
  'Pollution NOC (CTE/CTO)',
  'Labour NOC',
  'Electrical Safety NOC',
  'Factory License',
  'Fire NOC',
  'Documentation Services',
  'Liaisoning Services',
];

export default function Contact() {
  const { settings } = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      const response = await axios.post('/api/leads', data, {
        baseURL: import.meta.env.VITE_API_URL || '',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitSuccess(true);
        reset();
      }
    } catch (err) {
      console.error('Lead submission error:', err);

      setSubmitError(
        err.response?.data?.message ||
          'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Claim Subsidy in UP"
        description="Get in touch with Sri Radhey Consultancy. Share your industrial details to check MSME subsidy eligibility and compliance NOC requirements."
        path="/contact"
        jsonLd={[
          createOrganizationSchema(settings),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Sri Radhey Consultancy',
            url: `${SITE_URL}/contact`,
          },
        ]}
      />

      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">
            Connect With Us
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            Contact Our Advisory Desk
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Submit your plant specifications and machinery values for immediate
            eligibility assessment.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary font-display">
                Office Address & Details
              </h2>
              <div className="h-0.5 w-12 bg-accent"></div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Our consultancy handles filings throughout all districts of Uttar
                Pradesh.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="font-display font-semibold text-sm text-primary">
                    Our Offices
                  </h4>

                  <div className="text-xs text-text-muted mt-2 leading-relaxed space-y-3">
                    <div>
                      <span className="font-semibold text-primary">
                        Head Office (Kanpur)
                      </span>
                      <p>{settings.addresses?.headOffice}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-primary">
                        Branch Office (Greater Noida)
                      </span>
                      <p>{settings.addresses?.branchOffice}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-primary">
                    Direct Hotlines
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-primary">
                    Email Enquiries
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-background-alt border rounded-xl p-6 sm:p-10 shadow-premium relative">
            {submitSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/15 flex items-center justify-center rounded-full mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-display">
                  Inquiry Submitted Successfully
                </h3>
                <p className="text-xs text-text-muted">
                  Thank you. Our team will review your details and contact you shortly.
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
                <h3 className="font-display font-bold text-lg text-primary">
                  Eligibility Diagnostic Form
                </h3>

                {submitError && (
                  <div className="p-3 bg-red-50 border rounded text-xs text-red-600">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      placeholder="Name *"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full border p-2 rounded text-xs"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-600 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      placeholder="Company *"
                      {...register('company', {
                        required: 'Company name is required',
                      })}
                      className="w-full border p-2 rounded text-xs"
                    />
                    {errors.company && (
                      <p className="text-[10px] text-red-600 mt-1">
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      placeholder="Phone *"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Enter a valid 10-digit phone number',
                        },
                      })}
                      className="w-full border p-2 rounded text-xs"
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-600 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      placeholder="WhatsApp Number"
                      {...register('whatsappNumber', {
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Enter a valid 10-digit WhatsApp number',
                        },
                      })}
                      className="w-full border p-2 rounded text-xs"
                    />
                    {errors.whatsappNumber && (
                      <p className="text-[10px] text-red-600 mt-1">
                        {errors.whatsappNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <input
                  placeholder="Email *"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Enter a valid email address',
                    },
                  })}
                  className="w-full border p-2 rounded text-xs"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      {...register('district', {
                        required: 'Please select district',
                      })}
                      className="w-full border p-2 rounded text-xs"
                    >
                      <option value="">Select District *</option>
                      {upDistricts.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-[10px] text-red-600 mt-1">
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <select
                      {...register('industry', {
                        required: 'Please select industry type',
                      })}
                      className="w-full border p-2 rounded text-xs"
                    >
                      <option value="">Select Industry Type *</option>
                      {industryTypes.map((industry, i) => (
                        <option key={i} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-[10px] text-red-600 mt-1">
                        {errors.industry.message}
                      </p>
                    )}
                  </div>
                </div>

                <select
                  {...register('serviceRequired', {
                    required: 'Please select service',
                  })}
                  className="w-full border p-2 rounded text-xs"
                >
                  <option value="">Select Service *</option>
                  {servicesRequired.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.serviceRequired && (
                  <p className="text-[10px] text-red-600 mt-1">
                    {errors.serviceRequired.message}
                  </p>
                )}

                <textarea
                  rows="4"
                  placeholder="Message / Project Details"
                  {...register('message')}
                  className="w-full border p-2 rounded text-xs"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Enquiry
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
