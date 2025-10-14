import React, { useState, useEffect } from 'react';
import CommonFooter from '../components/CommonFooter';

const Rates: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('naira');
  const [selectedGiftCard, setSelectedGiftCard] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [cardAmount, setCardAmount] = useState('');
  const [cashValue, setCashValue] = useState(0);
  const [usdToCnyRate] = useState(7.5); // 美元到人民币汇率（提高）
  const [gbpToCnyRate] = useState(9.5); // 英镑到人民币汇率（提高）
  const [cadToCnyRate] = useState(5.8); // 加元到人民币汇率（提高）
  const [cnyToLocalRate, setCnyToLocalRate] = useState(220); // 人民币到当地货币汇率（提高）

  const giftCards = [
    { name: 'Amazon', subCategories: ['Amazon US', 'Amazon UK', 'Amazon Canada'], serviceFee: 0 },
    { name: 'Apple', subCategories: ['iTunes', 'App Store', 'Apple Music'], serviceFee: 0 },
    { name: 'Google Play', subCategories: ['Google Play US', 'Google Play UK'], serviceFee: 0 },
    { name: 'Steam', subCategories: ['Steam Wallet', 'Steam Gift Card'], serviceFee: 0 },
    { name: 'Xbox', subCategories: ['Xbox Live', 'Xbox Game Pass'], serviceFee: 0 },
    { name: 'PlayStation', subCategories: ['PSN US', 'PSN UK', 'PSN EU'], serviceFee: 0 },
    { name: 'Netflix', subCategories: ['Netflix US', 'Netflix UK'], serviceFee: 0 },
    { name: 'Spotify', subCategories: ['Spotify Premium', 'Spotify Gift Card'], serviceFee: 0 }
  ];

  // 使用固定汇率，不获取实时汇率
  useEffect(() => {
    // 根据选择的货币设置固定汇率
    if (selectedCurrency === 'naira') {
      setCnyToLocalRate(220); // 人民币到奈拉固定汇率
    } else if (selectedCurrency === 'cedis') {
      setCnyToLocalRate(2.2); // 人民币到加纳塞地固定汇率
    }
  }, [selectedCurrency]);

  const calculateValue = () => {
    if (selectedSubCategory && cardAmount) {
      const amount = parseFloat(cardAmount);
      if (amount && amount > 0) {
        // 根据选择的子类别确定使用哪个汇率
        let sourceToCnyRate = usdToCnyRate; // 默认使用美元汇率
        
        if (selectedSubCategory.includes('UK') || selectedSubCategory.includes('GBP')) {
          sourceToCnyRate = gbpToCnyRate;
        } else if (selectedSubCategory.includes('Canada') || selectedSubCategory.includes('CAD')) {
          sourceToCnyRate = cadToCnyRate;
        }

        // 计算公式: 商品价值 * 源货币到CNY汇率 * CNY到当地货币汇率（不收取服务费）
        const result = amount * sourceToCnyRate * cnyToLocalRate;
        
        // 去掉小数点
        setCashValue(Math.floor(result));
      } else {
        setCashValue(0);
      }
    } else {
      setCashValue(0);
    }
  };

  useEffect(() => {
    calculateValue();
  }, [selectedSubCategory, cardAmount, selectedCurrency, usdToCnyRate, gbpToCnyRate, cadToCnyRate, cnyToLocalRate]);

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
            Rich's Gift Card
          </h1>
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Rate Calculator
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Find out the current rate of different gift cards in Naira or Cedis using Rich's gift card rate calculator.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="w-full px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {/* Currency Selection */}
              <div className="flex mb-8">
                <button
                  onClick={() => setSelectedCurrency('naira')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCurrency === 'naira'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Naira (₦)
                </button>
                <button
                  onClick={() => setSelectedCurrency('cedis')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCurrency === 'cedis'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Ghana Cedis (GHC)
                </button>
              </div>

              {/* Input Fields */}
              <div className="space-y-6 mb-8">
                {/* Select Gift Card */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Select Gift Card</label>
                  <div className="relative">
                    <select
                      value={selectedGiftCard}
                      onChange={(e) => {
                        setSelectedGiftCard(e.target.value);
                        setSelectedSubCategory('');
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Choose a gift card</option>
                      {giftCards.map((card) => (
                        <option key={card.name} value={card.name}>{card.name}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Select Sub-category */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Select Sub-category</label>
                  <div className="relative">
                    <select
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                      disabled={!selectedGiftCard}
                    >
                      <option value="">Choose a sub-category</option>
                      {selectedGiftCard && giftCards.find(card => card.name === selectedGiftCard)?.subCategories.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enter card Amount */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Enter card Amount</label>
                  <input
                    type="number"
                    value={cardAmount}
                    onChange={(e) => setCardAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-4 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>


              {/* Cash Value Display */}
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Cash Value</label>
                <div className="text-4xl font-black text-cyan-500">
                  {selectedCurrency === 'naira' ? '₦' : 'GHC '}{cashValue.toLocaleString()}
                </div>
              </div>

              {/* Get Started Button */}
              <button 
                onClick={() => window.open('https://wa.me/8619371138377?text=Hi%2C%20I%27m%20interested%20in%20trading%20gift%20cards%20on%20Rich%21', '_blank')}
                className="w-full py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors mb-4"
              >
                Get Started
              </button>

              {/* Disclaimer */}
              <p className="text-gray-500 text-sm text-center">
                Amount calculated based on current rate.
              </p>
            </div>
          </div>
        </div>
        </section>

        {/* How to Sell Gift Cards Section */}
        <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900">
          <div className="w-full px-6">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  How to Sell Gift Cards on Rich
                </h2>
                <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                  If you want to sell your gift card, you can use our{" "}
                  <span className="text-cyan-300 font-semibold">Web App</span> or download our{" "}
                  <span className="text-cyan-300 font-semibold">Mobile App</span> then follow below step-by-step guide.
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      1
                    </div>
                    <h3 className="font-semibold text-white">Create Account</h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Create an account or sign in if you already have an account.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      2
                    </div>
                    <h3 className="font-semibold text-white">Add Bank Account</h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Go to Wallet and add your Nigerian Bank Account.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      3
                    </div>
                    <h3 className="font-semibold text-white">Sell Gift Card</h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Go to the main menu and click Sell Gift Card.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      4
                    </div>
                    <h3 className="font-semibold text-white">Select Category</h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Select Gift Card category and a subcategory.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      5
                    </div>
                    <h3 className="font-semibold text-white">Enter Details</h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Enter value of the gift card and upload image or type the ecode.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      6
                    </div>
                    <h3 className="font-semibold text-white">Submit Trade</h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Submit trade and wait for confirmation.
                  </p>
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

  export default Rates;