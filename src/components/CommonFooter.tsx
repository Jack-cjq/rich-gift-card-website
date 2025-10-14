import React from 'react';
import { Link } from 'react-router-dom';

const CommonFooter: React.FC = () => {
  return (
    <>
      {/* Stats CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-600/30 p-12 text-center shadow-2xl shadow-purple-500/25 border border-cyan-400/30 backdrop-blur-sm">
              <h4 className="text-3xl md:text-4xl font-black text-white mb-4">Our Impact in Numbers</h4>
              <p className="text-blue-200 text-lg mb-12">Trusted by thousands of satisfied customers</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                    value: "98,500+",
                    label: "Transactions"
                  },
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    value: "8",
                    label: "Years"
                  },
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-blue-200 text-lg group-hover:text-cyan-200 transition-colors duration-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-cyan-500/10 to-purple-600/20 border-t border-cyan-400/30">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Pages Column */}
              <div>
                <h5 className="text-xl font-bold text-white mb-6">Pages</h5>
                <div className="space-y-3">
                  <Link to="/" className="block text-blue-200 hover:text-cyan-300 transition-colors">Home</Link>
                  <Link to="/about" className="block text-blue-200 hover:text-cyan-300 transition-colors">About</Link>
                  <Link to="/faqs" className="block text-blue-200 hover:text-cyan-300 transition-colors">FAQs</Link>
                  <Link to="/blogs" className="block text-blue-200 hover:text-cyan-300 transition-colors">Blog</Link>
                </div>
              </div>

              {/* Logo and Socials Column */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <img 
                    src="/src/images/Rich-logo.png" 
                    alt="Rich Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <div className="font-black text-2xl bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">RICH</div>
                </div>
                <h5 className="text-xl font-bold text-white mb-6">Socials</h5>
                <div className="space-y-3">
                  <a href="#" className="block text-blue-200 hover:text-cyan-300 transition-colors">Instagram</a>
                  <a href="#" className="block text-blue-200 hover:text-cyan-300 transition-colors">TikTok</a>
                </div>
              </div>

              {/* Company Description Column */}
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-blue-200 leading-relaxed">
                    Rich Is A Verified Chinese Company Trusted By Millions Of Nigerians. We are the top gift card buyers in Nigeria at a very high rate.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src="/src/images/Rich-logo.png" 
                    alt="Rich Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center pt-8 border-t border-cyan-400/30">
              <p className="text-gray-400 text-sm">Copyright © Rich {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CommonFooter;
