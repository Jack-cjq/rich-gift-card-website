import React, { useState } from 'react';
import CommonFooter from '../components/CommonFooter';

const FAQs: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // 默认展开第一个

  const faqs = [
    {
      question: "Are your rates competitive?",
      answer: "Yes! We offer some of the highest rates in Nigeria and Ghana because we value your cards."
    },
    {
      question: "What gift cards do you buy?",
      answer: "We buy iTunes, Amazon, Steam, Google Play, Walmart, eBay, Sephora, Nordstrom, Razer Gold, and many more!"
    },
    {
      question: "Hope it's not a scam?",
      answer: "No, Rich is a trusted platform with thousands of reviews and years in the market"
    },
    {
      question: "How do I sell my gift card to you?",
      answer: "Download our app from the Apple App Store or Google Play Store. Register an account in seconds. Tap \"Trade Gift Card\" and upload your card details. See the offer & real-time rate—no hidden fees! Confirm the trade and receive your money instantly in your app wallet. Withdraw to your Naira account and get credited in under 2 minutes!"
    },
    {
      question: "What if my gift card is invalid or already used?",
      answer: "We verify all cards before payment. If your card is invalid, we'll notify you immediately. No payment is sent for faulty cards."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 text-white">

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900">
        <div className="w-full px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Frequently Asked Questions
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4"></div>
          </h1>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl overflow-hidden backdrop-blur-sm shadow-lg">
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-white min-w-[3rem]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-semibold text-lg text-white">{faq.question}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg 
                        className={`w-4 h-4 text-white transition-transform duration-200 ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Answer Body */}
                  {openFAQ === index && (
                    <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      <div className="ml-16">
                        <p className="text-blue-200 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
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

export default FAQs;
