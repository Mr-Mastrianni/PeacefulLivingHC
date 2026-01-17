
import React, { useState, useEffect } from 'react';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, CONTACT_PERSON, FORMSPREE_ID, CAREERS_LINK, MailIcon, PhoneIcon } from '../constants';
import { useForm, ValidationError } from '@formspree/react';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm(FORMSPREE_ID || "YOUR_FORM_ID");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
    }
  }, [state.succeeded]);

  const handleReset = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      {/* Hero */}
      <section className="pt-20 pb-12 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-slate-900 mb-6">Contact Us</h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            If you need more information or have questions, our team of advisors is ready to help. Reach out via phone or use the contact form below — we're here to guide you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-5 gap-16">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="mb-10">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Contact</h2>
                <p className="text-3xl font-serif text-slate-800">{CONTACT_PERSON}</p>
              </div>

              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs opacity-50">Direct Contact</h2>
              <div className="space-y-6">
                <a
                  href={PHONE_TEL}
                  className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-50 hover:border-purple-200 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <PhoneIcon />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Call Us</p>
                    <p className="text-xl font-bold text-slate-800">{PHONE_DISPLAY}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-50 hover:border-purple-200 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-6 group-hover:bg-pink-600 group-hover:text-white transition-all">
                    <MailIcon />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Email Us</p>
                    <p className="text-lg font-bold text-slate-800 break-all">{EMAIL}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-accent opacity-20 blur-2xl rounded-full"></div>
              <h2 className="text-2xl font-serif font-bold mb-4 relative z-10">Explore Career Opportunities</h2>
              <p className="text-slate-400 mb-8 relative z-10 leading-relaxed">
                We are always looking for passionate caregivers to join our family. Check our current openings and apply today.
              </p>
              <a
                href={CAREERS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 gradient-accent text-white font-bold rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-1 relative z-10"
              >
                Join Our Team
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Send a Message</h2>

              {showSuccess ? (
                <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h3>
                  <p className="text-slate-500">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                  <button
                    onClick={handleReset}
                    className="mt-8 text-purple-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(317) 000-0000"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">How can we help?</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell us about your needs..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
                    ></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs" />
                  </div>
                  <button
                    disabled={state.submitting || !FORMSPREE_ID}
                    type="submit"
                    className="w-full py-5 gradient-accent text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? 'Sending...' : 'Send Request'}
                  </button>
                  {!FORMSPREE_ID && (
                    <p className="text-xs text-red-400 font-bold text-center mt-2">Formspree ID missing in constants.tsx</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
