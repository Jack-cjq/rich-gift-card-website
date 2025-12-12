import React from 'react';
import { Link } from 'react-router-dom';

const CommonFooter: React.FC = () => {
  return (
    <>
      {/* Stats CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white/80 p-12 text-center shadow-2xl shadow-teal-500/10 border border-teal-200/50 backdrop-blur-sm">
              <h4 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">Our Impact in Numbers</h4>
              <p className="text-slate-600 text-lg mb-12">Trusted by thousands of satisfied customers</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                    value: "98,500+",
                    label: "Transactions"
                  },
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    value: "8",
                    label: "Years"
                  },
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    value: "100%",
                    label: "Support"
                  }
                ].map((stat, i) => (
                  <div key={i} className="text-center group cursor-pointer">
                    <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:from-teal-700 group-hover:to-cyan-700 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-slate-600 text-lg group-hover:text-teal-700 transition-colors duration-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 border-t border-teal-200/50">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Pages Column */}
              <div>
                <h5 className="text-xl font-bold text-slate-800 mb-6">Pages</h5>
                <div className="space-y-3">
                  <Link to="/" className="block text-slate-600 hover:text-teal-600 transition-colors">Home</Link>
                  <Link to="/about" className="block text-slate-600 hover:text-teal-600 transition-colors">About</Link>
                  <Link to="/faqs" className="block text-slate-600 hover:text-teal-600 transition-colors">FAQs</Link>
                  <Link to="/blogs" className="block text-slate-600 hover:text-teal-600 transition-colors">Blog</Link>
                </div>
              </div>

              {/* Logo and Socials Column */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <img 
                    src="/images/Rich-logo.png" 
                    alt="Rich Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <div className="font-black text-2xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">RICH</div>
                </div>
                <h5 className="text-xl font-bold text-slate-800 mb-6">Socials</h5>
                <div className="space-y-3">
                  <a href="#" className="block text-slate-600 hover:text-teal-600 transition-colors">Instagram</a>
                  <a href="#" className="block text-slate-600 hover:text-teal-600 transition-colors">TikTok</a>
                </div>
              </div>

              {/* Company Description Column */}
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-slate-600 leading-relaxed">
                    Rich Is A Verified Chinese Company Trusted By Millions Of Nigerians. We are the top gift card buyers in Nigeria at a very high rate.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src="/images/Rich-logo.png" 
                    alt="Rich Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center pt-8 border-t border-teal-200/50">
              <p className="text-slate-500 text-sm">Copyright © Rich {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CommonFooter;
