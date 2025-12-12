import React from 'react';
import { Link } from 'react-router-dom';
import CommonFooter from '../components/CommonFooter';

const Blogs: React.FC = () => {

  const blogPosts = [
    {
      id: 1,
      slug: "how-to-sell-gift-cards-best-rates-nigeria",
      title: "How to Sell Your Gift Cards for the Best Rates in Nigeria",
      subtitle: "Latest Method",
      excerpt: "Discover the most effective strategies to maximize your gift card value in Nigeria's competitive market.",
      author: "Yaya",
      date: "122 days ago",
      category: "GIFT CARD TRADE",
      tag: "Editor's Pick",
      image: "STEAM",
      isFeatured: true
    },
    {
      id: 2,
      slug: "best-gift-cards-music-lovers-nigeria",
      title: "Best Gift Cards for Music Lovers in Nigeria",
      excerpt: "Enjoy Unlimited Music & Cash Out If Needed!",
      author: "Yaya",
      date: "122 days ago",
      category: "GIFT CARD TRADE",
      image: "Music Cards",
      isFeatured: false
    },
    {
      id: 3,
      slug: "where-to-sell-gift-cards-nigeria-best-rate",
      title: "Where to Sell Gift Cards in Nigeria at the Best Rate",
      excerpt: "Find the most reliable platforms and get the highest rates for your gift cards.",
      author: "Kevin",
      date: "123 days ago",
      category: "GIFT CARD TRADE",
      image: "Best Rate",
      isFeatured: false
    }
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-cyan-50 to-teal-50 text-slate-800">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-cyan-50 to-teal-50">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Stories & Insights
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
              Stay ahead with our curated collection of expert articles, in-depth guides, and industry insights to navigate the ever-evolving world of finance and travel.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">200+</div>
                <div className="text-slate-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">50k+</div>
                <div className="text-slate-600">Readers</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">12+</div>
                <div className="text-slate-600">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-cyan-50 to-teal-50">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Article */}
              <div className="lg:col-span-2">
                <div className="relative bg-white/60 rounded-3xl p-8 border border-teal-200/50 backdrop-blur-sm shadow-lg">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-3 py-1 rounded-full font-semibold">
                        {blogPosts[0].category}
                      </span>
                    </div>
                    <Link to={`/blog/${blogPosts[0].slug}`} className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                      Read Article →
                    </Link>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-8">
                    {blogPosts[0].subtitle}
                  </p>

                  {/* Overlay Card */}
                  <div className="relative bg-white/80 rounded-2xl p-6 shadow-lg border border-teal-200/50 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {blogPosts[0].title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>{blogPosts[0].author}</span>
                          <span>•</span>
                          <span>{blogPosts[0].date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-2 py-1 rounded-full">
                          {blogPosts[0].category}
                        </span>
                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-400/30">
                          {blogPosts[0].tag}
                        </span>
                      </div>
                    </div>
                    
                    {/* STEAM Logo */}
                    <div className="flex justify-end">
                      <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{blogPosts[0].image}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Articles */}
              <div className="space-y-6">
                {blogPosts.slice(1).map((post) => (
                  <article key={post.id} className="bg-white/60 rounded-2xl p-6 border border-teal-200/50 backdrop-blur-sm shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">🎵</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-2 py-1 rounded-full mb-2 inline-block">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>
                          <Link to={`/blog/${post.slug}`} className="text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors">
                            Read more →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/60 rounded-3xl p-12 shadow-lg border border-teal-200/50 backdrop-blur-sm">
              <div className="text-teal-600 text-sm font-semibold mb-2">Stay Connected</div>
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Get exclusive insights, expert analysis, and the latest articles delivered straight to your inbox. Join our growing community today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-teal-200/50 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200">
                  Subscribe
                </button>
              </div>
              
              <div className="flex justify-center gap-6 text-sm text-slate-600">
                <span>✓ No spam, ever</span>
                <span>✓ Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Footer with Stats and Footer */}
      <CommonFooter />
    </main>
  );
};

export default Blogs;
