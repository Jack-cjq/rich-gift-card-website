import React, { useState } from 'react';
import CommonFooter from '../components/CommonFooter';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission' },
    { id: 'values', label: 'Our Values' },
    { id: 'history', label: 'Our History' }
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-cyan-50 to-teal-50 text-slate-800">

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-cyan-50 to-teal-50">
        <div className="w-full px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">About Rich</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Your Trusted Partner for Gift Cards & Crypto Since 2018
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Company Introduction Video */}
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="w-full h-96 bg-white/60 border border-teal-200/50 rounded-2xl backdrop-blur-sm overflow-hidden shadow-lg">
                    <video 
                      className="w-full h-full object-cover rounded-2xl"
                      controls
                      playsInline
                      preload="metadata"
                      poster="/images/Rich-logo.png"
                    >
                      <source src="/videos/v1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Your Exchange, Your Way</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Rich is a premier Chinese-founded company that specializes in purchasing all types of gift cards and crypto assets at unbeatable rates. Trusted by millions of Nigerians and customers worldwide, we eliminate middlemen and offer a swift payment system and transparent transaction process.
                </p>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  We are the go-to platform for iTunes, Amazon, Steam, X-Box gift cards, and more. All denominations are accepted. We also purchase Cashapp, Zelle, and Paypal funds, providing a comprehensive exchange solution for all your digital assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Values/History Tabs Section */}
      <section className="py-20">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-white/60 border border-teal-200/50 rounded-2xl p-2 backdrop-blur-sm shadow-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                        : 'text-slate-600 hover:text-teal-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
                  </div>

            {/* Tab Content */}
            <div className="bg-white/60 border border-teal-200/50 rounded-2xl p-8 backdrop-blur-sm shadow-lg">
              {activeTab === 'mission' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Our Mission</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    At Rich, our mission is to provide a fast, secure, and reliable platform for exchanging gift cards, crypto assets, and digital funds at unbeatable rates. We eliminate the need for middlemen, ensuring swift payments and a seamless experience for our customers worldwide. We're committed to bridging the gap between different digital currencies and assets, making exchanges accessible to everyone, regardless of their technical knowledge or location.
                  </p>
                </div>
              )}

              {activeTab === 'values' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Our Values</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Transparency</h4>
                        <p className="text-slate-600">We believe in clear communication and honest rates with no hidden fees or surprises.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Security</h4>
                        <p className="text-slate-600">Your security is paramount. We invest in the best security measures to protect your transactions and data.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Speed</h4>
                        <p className="text-slate-600">We process transactions quickly so you receive your funds without unnecessary delays.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Customer-First</h4>
                        <p className="text-slate-600">Your satisfaction drives everything we do, with 24/7 support whenever you need assistance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Our History</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2018</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Founded in Guangzhou</h4>
                        <p className="text-slate-600">Rich was established with a vision to simplify digital asset exchanges and make them accessible to everyone.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2020</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">African Expansion</h4>
                        <p className="text-slate-600">We expanded our operations to Nigeria, rapidly becoming the trusted choice for millions of customers across Africa.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2022</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Global Reach</h4>
                        <p className="text-slate-600">Our platform now serves customers in over 50 countries with dedicated local support and multilingual services.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2024</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Innovation Leader</h4>
                        <p className="text-slate-600">Launched advanced AI-powered platform for faster verification and exchange processes, setting new industry standards.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Meet Our Leadership Team</h2>
            <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              The passionate professionals behind Rich, committed to providing you with the best service possible.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Rich's Team", 
                  subtitle: "Transaction Team", 
                  description: "busy day at the office",
                  image: "/images/About-img2.png"
                },
                { 
                  title: "Rich's Team", 
                  subtitle: "Transaction Team", 
                  description: "We are always available",
                  image: "/images/About-img3.png"
                },
                { 
                  title: "Rich's Team", 
                  subtitle: "Transaction Team", 
                  description: "Trade With The Best",
                  image: "/images/About-img4.png"
                }
              ].map((team, i) => (
                <div key={i} className="bg-white/60 border border-teal-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
                  <div className="w-full h-48 bg-white/40 border border-teal-200/30 rounded-2xl mb-4 overflow-hidden">
                    <img 
                      src={team.image} 
                      alt={team.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{team.title}</h3>
                  <p className="text-teal-600 font-semibold mb-2">{team.subtitle}</p>
                  <p className="text-slate-600 text-sm">{team.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Footer with Stats and Footer */}
      <CommonFooter />
    </main>
  );
};

export default About;
