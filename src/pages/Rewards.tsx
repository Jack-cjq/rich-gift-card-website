import React from 'react';
import CommonFooter from '../components/CommonFooter';

const Rewards: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 text-white">

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="w-full px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Welcome to Rich's Rewards
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Your loyalty means the world to us
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-lg text-blue-200 leading-relaxed text-center">
                At Rich, we believe in giving back to our valued customers. That's why we're excited to introduce our Giftcardtonaira Rewards program, designed to make every transaction with us more rewarding. With five fantastic ways to earn rewards, you'll enjoy an array of benefits just by being a loyal customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-20">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Discover the ways to earn rewards
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Trading Reward Points */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-white">Trading</h3>
                <p className="text-cyan-300 font-semibold mb-4">Reward Points</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  For every gift card transaction you complete with us, you'll earn Trading Reward Points. The more you trade, the more points you'll accumulate, which can be redeemed for cash or other exciting rewards.
                </p>
              </div>

              {/* Referral Reward Points */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-white">Referral</h3>
                <p className="text-cyan-300 font-semibold mb-4">Reward Points</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Share the Rich experience with your friends and earn Referral Reward Points! When your referred friends start trading with us, you'll earn points that can be redeemed for cash or other great benefits.
                </p>
              </div>

              {/* Promo Codes */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-white">Promo Codes</h3>
                <p className="text-cyan-300 font-semibold mb-4">Special Offers</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Keep an eye out for special promo codes that we'll occasionally offer. These codes will give you added bonuses on your transactions, helping you get even more value from your Rich experience.
                </p>
              </div>

              {/* Leaderboard */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-white">Leaderboard</h3>
                <p className="text-cyan-300 font-semibold mb-4">Competition</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Compete with fellow Rich users and climb the ranks in our weekly and monthly Leaderboards. Reach the top 10 positions and earn bonus points, which can be redeemed for cash or other amazing prizes.
                </p>
              </div>

              {/* Polls */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-white">Polls</h3>
                <p className="text-cyan-300 font-semibold mb-4">Participation</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Participate in our live polls and have your voice heard. By taking part in our polls, you'll earn additional cash straight into your wallet, which can be redeemed for more trading or withdrawn to your bank.
                </p>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Are you ready to make the most of your Rich experience?
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    Get started with Rich today and start unlocking the amazing benefits that await you. Happy trading!
                  </p>
                  <button 
                    onClick={() => window.open('https://api.whatsapp.com/send?phone=8619371138377&text=Hi%2C%20I%27m%20interested%20in%20trading%20gift%20cards%20on%20Rich%21%20Contact%3A%20%2B86%2019371138377', '_blank')}
                    className="w-full py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Trade Now
                  </button>
                </div>
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

export default Rewards;