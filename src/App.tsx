import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Import pages
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Blogs from "./pages/Blogs";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import Rates from "./pages/Rates";
import Rewards from "./pages/Rewards";
import CommonFooter from "./components/CommonFooter";
import ContactForm from "./components/ContactForm";
import { MetaEvents } from "./utils/metaCAPI";

// Register GSAP plugin
if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Navigation Component
const Navigation: React.FC = () => {
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = useMemo(() => [
    { label: 'Home', path: '/', isCurrentPage: true },
    { label: 'About', path: '/about', isCurrentPage: false },
    { label: 'FAQs', path: '/faqs', isCurrentPage: false },
    { label: 'Blogs', path: '/blogs', isCurrentPage: false },
    { label: 'Rates', path: '/rates', isCurrentPage: false },
    { label: 'Reward', path: '/rewards', isCurrentPage: false },
  ], []);

  const isCurrentPage = (path: string) => location.pathname === path;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Meta CAPI event handler - WhatsApp 点击转化事件
  const handleWhatsAppClick = () => {
    MetaEvents.whatsAppClick({
      currency: 'USD',
      value: 0
    });
    window.open('https://api.whatsapp.com/send?phone=8619972915971&text=Hi%2C%20I%27m%20interested%20in%20trading%20gift%20cards%20on%20Rich%21%20Contact%3A%20%2B86%2019972915971', '_blank');
  };

  // Scroll detection for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top or scrolling up
      if (currentScrollY < 10 || currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      } 
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-30 bg-white shadow-lg shadow-gray-200/30 transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={handleMobileMenuClose}>
            <img 
              src="/images/Rich-logo.png" 
              alt="Rich Logo" 
              className="w-8 h-8 object-contain"
            />
            <div className="font-black text-2xl tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent italic">
              Rich
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`bg-transparent border-none p-0 cursor-pointer transition-all duration-200 ${
                  isCurrentPage(item.path)
                    ? 'text-teal-700 font-semibold'
                    : 'text-slate-700 hover:text-teal-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-400 text-white font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-sky-300/30">
              Login
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold hover:from-teal-500 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-teal-300/30"
            >
              Get started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isCurrentPage(item.path)
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-700 hover:bg-gray-50 hover:text-teal-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 space-y-2">
                <button 
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-400 text-white font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-sky-300/30"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    handleMobileMenuClose();
                    handleWhatsAppClick();
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold hover:from-teal-500 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-teal-300/30"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Home Page Component
const HomePage: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>(Array(5).fill(null));
  const countsRef = useRef<(HTMLElement | null)[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const testimonialAutoplayIntervalRef = useRef<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mediaScrollPosition, setMediaScrollPosition] = useState(0);
  const mediaAutoplayIntervalRef = useRef<number | null>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const bgImages = useMemo(() => ['/images/bg1.jpg', '/images/bg2.jpg', '/images/bg3.jpg', '/images/bg4.jpg', '/images/bg5.jpg'], []);
  const bgCarouselIntervalRef = useRef<number | null>(null);
  const companyVideoRef = useRef<HTMLVideoElement>(null);

  // Meta CAPI event handler - 只追踪 WhatsApp 点击转化事件
  const handleWhatsAppClick = () => {
    MetaEvents.whatsAppClick({
      currency: 'USD',
      value: 0
    });
    window.open('https://api.whatsapp.com/send?phone=8619972915971&text=Hi%2C%20I%27m%20interested%20in%20trading%20gift%20cards%20on%20Rich%21%20Contact%3A%20%2B86%2019972915971', '_blank');
  };

  // Testimonial continuous smooth scrolling effect
  useEffect(() => {
    if (testimonialCarouselRef.current) {
      // Responsive card width: mobile (288px + 16px gap) vs desktop (320px + 24px gap)
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 304 : 344; // Width of one testimonial card + gap
      const totalCards = 15; // Number of testimonial cards
      const totalWidth = cardWidth * totalCards;

      const startContinuousScroll = () => {
        if (testimonialAutoplayIntervalRef.current) {
          clearInterval(testimonialAutoplayIntervalRef.current);
        }

        testimonialAutoplayIntervalRef.current = window.setInterval(() => {
          if (!isTestimonialHovered) {
            setScrollPosition(prev => {
              const newPosition = prev + 1; // Move 1px at a time for smoothness
              // Reset to 0 when we've scrolled through all cards
              if (newPosition >= totalWidth) {
                return 0;
              }
              return newPosition;
            });
          }
        }, 16); // 60fps smooth animation (1000ms / 60fps ≈ 16ms)
      };

      // Start continuous scroll after a short delay
      const timeoutId = setTimeout(() => {
        startContinuousScroll();
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        if (testimonialAutoplayIntervalRef.current) {
          clearInterval(testimonialAutoplayIntervalRef.current);
        }
      };
    }
  }, [isTestimonialHovered]);

  // Handle hover state changes
  useEffect(() => {
    if (isTestimonialHovered) {
      // Pause autoplay when hovered
      if (testimonialAutoplayIntervalRef.current) {
        clearInterval(testimonialAutoplayIntervalRef.current);
        testimonialAutoplayIntervalRef.current = null;
      }
    } else {
      // Resume autoplay when not hovered
      if (testimonialCarouselRef.current) {
        const cardWidth = 320;
        const totalCards = 15;
        const totalWidth = cardWidth * totalCards;

        testimonialAutoplayIntervalRef.current = window.setInterval(() => {
          setScrollPosition(prev => {
            const newPosition = prev + 1;
            if (newPosition >= totalWidth) {
              return 0;
            }
            return newPosition;
          });
        }, 16);
      }
    }
  }, [isTestimonialHovered, testimonialCarouselRef]);

  // Media carousel continuous smooth scrolling effect
  useEffect(() => {
    const startMediaAutoplay = () => {
      if (mediaAutoplayIntervalRef.current) {
        clearInterval(mediaAutoplayIntervalRef.current);
      }
      
      mediaAutoplayIntervalRef.current = window.setInterval(() => {
        setMediaScrollPosition(prev => {
          const isMobile = window.innerWidth < 768;
          const logoWidth = isMobile ? 92 : 160; // mobile: 80px + 12px gap, desktop: 112px + 48px gap
          const totalWidth = logoWidth * 3; // 3 logos per set
          const newPosition = prev + 0.5; // Slower scroll speed for media
          // Reset when we've scrolled through one complete set
          if (newPosition >= totalWidth) {
            return 0;
          }
          return newPosition;
        });
      }, 16); // 60fps smooth animation
    };

    // Start media autoplay after a short delay
    const timeoutId = setTimeout(() => {
      startMediaAutoplay();
    }, 2000); // Start 2 seconds after testimonials

    return () => {
      clearTimeout(timeoutId);
      if (mediaAutoplayIntervalRef.current) {
        clearInterval(mediaAutoplayIntervalRef.current);
      }
    };
  }, []);

  // Background image carousel effect
  useEffect(() => {
    // Preload all background images
    bgImages.forEach((bg) => {
      const img = new Image();
      img.src = bg;
    });

    bgCarouselIntervalRef.current = window.setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000); // Change background every 5 seconds

    return () => {
      if (bgCarouselIntervalRef.current) {
        clearInterval(bgCarouselIntervalRef.current);
      }
    };
  }, [bgImages]);

  // Auto-play company introduction video when it enters viewport
  useEffect(() => {
    const video = companyVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in viewport, play with sound
            video.muted = false;
            video.play().catch((error) => {
              console.log('Auto-play prevented:', error);
              // If autoplay is prevented, user can manually play
            });
          } else {
            // Video is out of viewport, pause it
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
        rootMargin: '0px'
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Mock data

  const stats = useMemo(
    () => [
      { label: "Transactions", value: 98500 },
      { label: "Years", value: 8 },
      { label: "Support", value: 100, suffix: "%" },
    ],
    []
  );


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll triggers removed as they're no longer needed for navigation

      // Section fade-up animations removed - sections now appear immediately without animation

      // parallax background glow on hero
      gsap.to("#heroGlow", {
        backgroundPosition: "200% 0%",
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "+=1000", scrub: true },
      });

      // Rectangular orbiting country flags animation removed

       // CountUp numbers in stats section
       countsRef.current.forEach((node) => {
         if (!node) return;
         const target = parseFloat(node.getAttribute("data-target") || "0");
         const suffix = node.getAttribute("data-suffix") || "";
         const obj = { val: 0 };
         gsap.fromTo(
           obj,
           { val: 0 },
           {
             val: target,
             duration: 1.2,
             ease: "power2.out",
             scrollTrigger: { trigger: node, start: "top 85%" },
             onUpdate: () => {
               const val = Math.floor(obj.val).toLocaleString();
               node.textContent = `${val}${suffix}`;
             },
           }
         );
       });

      // Auto-scrolling ticker (infinite marquee)
      if (tickerRef.current) {
        const wrapWidth = tickerRef.current.scrollWidth / 2; // two clones in DOM
        gsap.to(tickerRef.current, {
          x: -wrapWidth,
          duration: 120, // Even slower speed - 6x the original duration
          repeat: -1,
          ease: "none",
        });
      }

       // Simple carousel autoplay
       if (carouselRef.current) {
         const slides = carouselRef.current.querySelectorAll("[data-slide]");
         let index = 0;
         gsap.timeline({ repeat: -1 }).call(() => {
           slides.forEach((s: Element, i: number) => {
             if (i === index) {
               s.classList.add("opacity-100", "z-10");
               s.classList.remove("opacity-0", "z-0", "pointer-events-none");
             } else {
               s.classList.add("opacity-0", "z-0", "pointer-events-none");
               s.classList.remove("opacity-100", "z-10");
             }
           });
           index = (index + 1) % slides.length;
         }, [], 0).to({}, { duration: 3 });
       }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-cyan-50 to-teal-50 text-slate-800">
       {/* Hero */}
       <section id="hero" ref={(el) => { sectionsRef.current[0] = el; }} className="relative overflow-hidden">
        {/* Background Image Carousel */}
        <div className="carousel-container">
          <div className="carousel-image">
            <img
              src={bgImages[currentBgIndex]}
              alt={`Background ${currentBgIndex + 1}`}
              className="carousel-img"
              loading="eager"
              key={currentBgIndex}
            />
          </div>
        </div>
        
        {/* Gradient Overlay removed to show background images clearly */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/60 to-indigo-900/60" style={{ zIndex: 2 }}></div> */}
        
        {/* Original gradient overlay removed */}
        {/* <div id="heroGlow" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.1)_0%,rgba(147,51,234,0.2)_50%,rgba(34,211,238,0.1)_100%)] bg-[length:200%_100%]" style={{ zIndex: 3 }}></div> */}
        
        {/* brand ticker */}
        <div className="w-full relative" style={{ zIndex: 5, marginTop: 0 }}>
          <div className="overflow-hidden">
            <div className="w-full bg-white/20 backdrop-blur-sm md:py-5 py-4 overflow-hidden">
              <div className="relative flex" ref={tickerRef}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((clone) => (
                  <div key={clone} className="flex items-center justify-center gap-16">
                    {[
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/flqozzwd0ras0zk32zrr.png", alt: "Logo 1" },
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/pge4hbta6exzqpqffkbd.png", alt: "Logo 2" },
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/vmxifzteeql0k21wpcfu.png", alt: "Logo 3" },
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/abwa4jyinc6eqnyyn92w.png", alt: "Logo 4" },
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/qqvt06nn3lohxoaczzku.png", alt: "Logo 5" },
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/zhhtlcypjyisrojahrjt.png", alt: "Logo 6" },
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/ljoc36b1pbwdzoedold7.png", alt: "Logo 7" },
                      { src: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1747482905/assets/marquee/szdalnrnsmhcvif5czu3.png", alt: "Logo 8" }
                    ].map((logo, i) => (
                      <div key={`${clone}-${i}`} className="flex items-center justify-center px-4">
                        <img 
                          alt={logo.alt} 
                          loading="lazy" 
                          width="30" 
                          height="30" 
                          decoding="async" 
                          className="w-auto h-8" 
                          src={logo.src}
                        />
                        <div className="w-2 h-2 bg-white/80 rounded-full mx-8 flex-shrink-0 flex items-center justify-center"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Rates & Feed */}
       <section id="rates" ref={(el) => { sectionsRef.current[1] = el; }} className="py-20">
        <div className="w-full px-6 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Earn rewards every time you trade.
          </h2>
        </div>
        <div className="w-full px-6 grid xl:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-white/60 backdrop-blur border border-cyan-200/50 shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <div className="text-2xl font-bold text-teal-700">LiveRates</div>
            </div>
            <p className="text-slate-600 mb-6 text-sm">
              Get the best live rates for gift cards and crypto —real-time updates, unbeatable value, and instant payouts!
            </p>
            <div className="space-y-3 max-h-[370px] overflow-auto pr-1">
              {[
                { name: "Google Play Gift Card", range: "$10 - 500", rate: "₦1500", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023283/giftcards/zfm3ew7t8caxh7auw816.jpg" },
                { name: "iTunes Gift Card", range: "$100 - 500", rate: "₦1160", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760024199/giftcards/gmnbgq2j13woaxvdp0es.jpg" },
                { name: "Steam Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760022158/giftcards/nrdkprffdsjqiu4rwodi.jpg" },
                { name: "Netflix Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760022194/giftcards/zdh0hj3hionkgmdp5cht.jpg" },
                { name: "Xbox Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023367/giftcards/ffmub9lxhcco6fyfcfbo.jpg" },
                { name: "PlayStation Store Gift Card", range: "$0 - 0", rate: "₦1200", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023391/giftcards/unulwfe9mpfit3na4glk.jpg" },
                { name: "Visa Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023452/giftcards/dkp7mv2yjwgwkiwlglfs.jpg" },
                { name: "Sephora Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023476/giftcards/hl2typ1p2jyfskl04mmq.jpg" },
                { name: "eBay Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023501/giftcards/bweey1vl6sfk05qoqzef.jpg" },
                { name: "Home Depot Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023530/giftcards/pemvbfu4mqvdvbjfckwm.jpg" },
                { name: "Spotify Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023556/giftcards/f5vcercad1il8qq86ntt.jpg" },
                { name: "Macy's Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023579/giftcards/inirsujarumezn1awvoe.jpg" },
                { name: "Nike Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023602/giftcards/ptbtuh3s8muguoojsigm.jpg" },
                { name: "Adidas Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023638/giftcards/hl8gn0hbsxtytrh03u1q.jpg" },
                { name: "Roblox Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760023683/giftcards/ojtpzqety0lxoacnkkdq.jpg" },
                { name: "Nordstrom Gift Card", range: "$0 - 0", rate: "₦0", logo: "https://res.cloudinary.com/dgsdtvxek/image/upload/v1760024222/giftcards/aym1ss53drzqi2uisxt0.jpg" }
              ].map((r, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl p-3 bg-white/40 backdrop-blur-sm border border-cyan-100/50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                      <img 
                        src={r.logo} 
                        alt={r.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{display: 'none'}}>
                        {r.name.charAt(0)}
                      </div>
                    </div>
                    <div className="font-medium text-slate-700 text-sm">{r.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-slate-500">{r.range}</div>
                    <div className="text-sm text-teal-600 font-semibold">{r.rate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/60 backdrop-blur border border-teal-200/50 shadow-lg p-6">
            <div className="text-2xl font-bold mb-4 text-teal-700">60,000+ People have earned from Rich</div>
            <p className="text-slate-600 mb-6 text-sm">
              Convert gift cards and crypto to cash instantly—fast, secure, and hassle-free!
            </p>
            <div className="mb-6">
              <button 
                onClick={handleWhatsAppClick}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-teal-300/30"
              >
                Trade Now →
              </button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-auto pr-1">
              {[
                { name: "Funke ******", type: "Crypto", amount: "₦65,549.00", status: "Successful" },
                { name: "Adebisi*******", type: "Gift Card", amount: "₦78,979.00", status: "Successful" },
                { name: "Kojo E******", type: "Crypto", amount: "₦510,620.00", status: "Rejected" },
                { name: "Chuka Q******", type: "Crypto", amount: "₦11,005.00", status: "Failed" },
                { name: "Nana ****", type: "Gift Card", amount: "₦13,160.00", status: "Processing" },
                { name: "Ifeoluwa*******", type: "Gift Card", amount: "₦1,218.00", status: "Rejected" },
                { name: "Yaw Ol******", type: "Withdrawal", amount: "₦11,132.00", status: "Failed" },
                { name: "Blessing A****", type: "Crypto", amount: "₦45,230.00", status: "Successful" },
                { name: "Emmanuel K****", type: "Gift Card", amount: "₦89,450.00", status: "Successful" },
                { name: "Grace M******", type: "Crypto", amount: "₦156,780.00", status: "Processing" },
                { name: "David O******", type: "Gift Card", amount: "₦23,890.00", status: "Successful" },
                { name: "Sarah T******", type: "Withdrawal", amount: "₦67,340.00", status: "Failed" },
                { name: "Michael B****", type: "Crypto", amount: "₦234,560.00", status: "Successful" },
                { name: "Jennifer L****", type: "Gift Card", amount: "₦12,450.00", status: "Rejected" },
                { name: "James W******", type: "Crypto", amount: "₦89,120.00", status: "Processing" },
                { name: "Mary C******", type: "Gift Card", amount: "₦34,670.00", status: "Successful" },
                { name: "Robert D*****", type: "Withdrawal", amount: "₦145,890.00", status: "Successful" },
                { name: "Linda S******", type: "Crypto", amount: "₦78,230.00", status: "Failed" },
                { name: "William J*****", type: "Gift Card", amount: "₦56,780.00", status: "Processing" },
                { name: "Patricia H****", type: "Crypto", amount: "₦123,450.00", status: "Successful" },
                { name: "Christopher M**", type: "Gift Card", amount: "₦45,670.00", status: "Rejected" },
                { name: "Elizabeth R****", type: "Withdrawal", amount: "₦98,340.00", status: "Failed" },
                { name: "Thomas A******", type: "Crypto", amount: "₦167,890.00", status: "Successful" },
                { name: "Barbara W*****", type: "Gift Card", amount: "₦23,560.00", status: "Processing" },
                { name: "Richard S*****", type: "Crypto", amount: "₦89,450.00", status: "Successful" },
                { name: "Susan M******", type: "Gift Card", amount: "₦34,120.00", status: "Rejected" },
                { name: "Joseph T******", type: "Withdrawal", amount: "₦156,780.00", status: "Failed" },
                { name: "Jessica B*****", type: "Crypto", amount: "₦67,230.00", status: "Successful" },
                { name: "Daniel L******", type: "Gift Card", amount: "₦45,890.00", status: "Processing" },
                { name: "Sarah D******", type: "Crypto", amount: "₦234,560.00", status: "Successful" }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl p-3 bg-white/40 backdrop-blur-sm border border-teal-100/50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-700 text-sm">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-teal-600 font-semibold">{user.amount}</div>
                    <div className={`text-xs ${
                      user.status === 'Successful' ? 'text-green-400' :
                      user.status === 'Processing' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {user.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

       {/* Rewards */}
       <section id="rewards" ref={(el) => { sectionsRef.current[2] = el; }} className="py-20">
        <div className="w-full px-6 grid xl:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Earn Rewards</h2>
            <p className="mt-4 text-lg text-slate-600">
              Earn rewards by referring friends to our platform! Every successful referral brings you closer to exclusive perks. Start sharing and get your reward.
            </p>
            <button className="mt-6 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-300/30 hover:from-teal-600 hover:to-cyan-600 transition-all duration-200">Start Earning →</button>
          </div>
           <div className="rounded-3xl bg-white/60 backdrop-blur-sm p-8 border border-teal-200/50 shadow-lg">
             <div className="mb-6">
               <div className="flex items-center justify-between mb-4">
                 <span className="text-teal-700 font-semibold">JOHNDOE198</span>
                 <button className="text-teal-600 hover:text-teal-700 transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                   </svg>
                 </button>
               </div>
               <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-6 border border-teal-200/50">
                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Earn Rewards</h3>
                 <p className="text-slate-600 text-sm mb-4">Refer your friends and earn points anytime they trade.</p>
                 <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                     <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                     </svg>
                   </div>
                   <div className="flex-1">
                     <div className="text-slate-800 font-semibold">Referral Program</div>
                     <div className="text-teal-600 text-sm">Earn 5% commission on every trade</div>
                   </div>
                 </div>
               </div>
             </div>
             <div className="grid grid-cols-3 gap-4 text-center">
               {stats.map((s, i) => (
                 <div key={i} className="p-4">
                   <div ref={(el) => { countsRef.current[i] = el; }} data-target={s.value} data-suffix={s.suffix || ""} className="text-3xl font-extrabold text-teal-600">
                     0
                   </div>
                   <div className="mt-1 text-sm text-slate-600">{s.label}</div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* Why Our Customers Love Us */}
      <section id="testimonials" ref={(el) => { sectionsRef.current[3] = el; }} className="py-20">
        <div className="w-full px-6">
          <h3 className="text-3xl font-black mb-12 text-center bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Why Our Customers Love Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Fast Payments */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Fast Payments</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Receive your payment instantly with no unnecessary delays, so you can access your cash whenever you need it.
              </p>
            </div>

            {/* Secure Transactions */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Secure Transactions</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your security is our top priority, with advanced encryption and fraud protection ensuring that every transaction is safe and reliable.
              </p>
            </div>

            {/* Best Exchange Rates */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Best Exchange Rates</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We offer the most competitive exchange rates, giving you the best value for your gift cards and crypto assets every time.
              </p>
            </div>

            {/* 24/7 Customer Support */}
            <div className="text-center md:col-span-2 lg:col-span-3 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">24/7 Customer Support</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our dedicated support team is available 24/7 to assist you with any questions or concerns, ensuring a smooth and hassle-free experience.
              </p>
            </div>
          </div>

          {/* Company Introduction Video */}
          <div className="mt-16 max-w-6xl mx-auto">
            <h4 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Company Introduction</h4>
            <div className="relative flex justify-center">
              <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm border border-teal-200/50 shadow-xl">
                <video 
                  ref={companyVideoRef}
                  className="w-full h-full object-cover"
                  controls
                  preload="auto"
                  playsInline
                  muted={false}
                >
                  <source src="/videos/Introduction.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,184,166,0.1)_0%,rgba(6,182,212,0.15)_50%,rgba(20,184,166,0.1)_100%)] bg-[length:200%_200%] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-100/30 via-transparent to-cyan-100/30"></div>
        
        <div className="w-full px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Trusted by over 70,000+ Customers
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-6 h-6 ${
                        star <= 4 
                          ? 'text-teal-500 drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]' 
                          : star === 5 
                            ? 'text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]' 
                            : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">4.5+</span>
              </div>
              <p className="text-slate-600 text-lg">
                Score based on thousands of reviews on the google play store and apple app store.
              </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative overflow-x-auto overflow-y-visible md:overflow-hidden">
              <div 
                ref={testimonialCarouselRef}
                className="flex gap-4 md:gap-6 pb-4" 
                id="testimonials-carousel"
                style={{ 
                  transform: `translateX(-${scrollPosition}px)`,
                  transition: isTestimonialHovered ? 'transform 0.3s ease-out' : 'none'
                }}
                onMouseEnter={() => setIsTestimonialHovered(true)}
                onMouseLeave={() => setIsTestimonialHovered(false)}
              >
                {/* First set of testimonials */}
                {[
                  {
                    text: "Amazing platform for trading gift cards. The Naira and Cedi payments are processed in no time!",
                    author: "Kwabena Boateng"
                  },
                  {
                    text: "I'm impressed by how fast and secure my transactions are. It's always a smooth experience with Naira or Cedi payouts.",
                    author: "Akosua"
                  },
                  {
                    text: "The customer service is excellent! They quickly solved all my issues and ensured I got my Naira and Cedi payments without delay.",
                    author: "Kojo Mensah"
                  },
                  {
                    text: "Such a user-friendly interface and super fast payments. The best platform for gift card trading!",
                    author: "Ankomah"
                  },
                  {
                    text: "Every time I use this platform, the rates are great, and the process is hassle-free. Truly top-notch!",
                    author: "Osei"
                  },
                  {
                    text: "It's great to have a reliable platform for Naira and Cedi transactions. Fast, secure, and trustworthy!",
                    author: "Adwoa"
                  },
                  {
                    text: "The best gift card trading experience I've ever had. Quick payments and excellent support!",
                    author: "Kofi Asante"
                  },
                  {
                    text: "I love how easy it is to trade my gift cards here. The rates are competitive and payments are instant.",
                    author: "Ama Serwaa"
                  },
                  {
                    text: "This platform has revolutionized how I handle my gift cards. The crypto integration is seamless!",
                    author: "Yaw Osei"
                  },
                  {
                    text: "Outstanding service! My transactions are always processed quickly and the rates are unbeatable.",
                    author: "Efua Mensah"
                  },
                  {
                    text: "The mobile app is incredible. I can trade anywhere, anytime with complete confidence.",
                    author: "Kweku Asante"
                  },
                  {
                    text: "Professional, reliable, and fast. This is the future of gift card trading in Africa.",
                    author: "Ama Serwaa"
                  },
                  {
                    text: "The security features give me peace of mind. I trust this platform with all my transactions.",
                    author: "Kwame Nkrumah"
                  },
                  {
                    text: "Excellent customer support and lightning-fast payouts. Highly recommended!",
                    author: "Akosua Boateng"
                  },
                  {
                    text: "The best rates I've found anywhere. This platform has saved me so much money!",
                    author: "Kojo Asante"
                  }
                ].map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[calc(100vw-3rem)] md:w-80 rounded-2xl p-4 md:p-6 shadow-2xl border border-teal-200/50 snap-center bg-white/80 backdrop-blur-sm relative overflow-hidden"
                  >
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 via-cyan-100/30 to-sky-100/30 rounded-2xl blur-sm"></div>
                    <div className="relative z-10">
                      <div className="mb-4">
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-300/40">
                          <span className="text-white font-bold text-sm">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-700 text-sm">
                            {testimonial.author}
                          </div>
                          <div className="text-slate-500 text-xs">
                            Verified Customer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {[
                  {
                    text: "Amazing platform for trading gift cards. The Naira and Cedi payments are processed in no time!",
                    author: "Kwabena Boateng"
                  },
                  {
                    text: "I'm impressed by how fast and secure my transactions are. It's always a smooth experience with Naira or Cedi payouts.",
                    author: "Akosua"
                  },
                  {
                    text: "The customer service is excellent! They quickly solved all my issues and ensured I got my Naira and Cedi payments without delay.",
                    author: "Kojo Mensah"
                  },
                  {
                    text: "Such a user-friendly interface and super fast payments. The best platform for gift card trading!",
                    author: "Ankomah"
                  },
                  {
                    text: "Every time I use this platform, the rates are great, and the process is hassle-free. Truly top-notch!",
                    author: "Osei"
                  },
                  {
                    text: "It's great to have a reliable platform for Naira and Cedi transactions. Fast, secure, and trustworthy!",
                    author: "Adwoa"
                  },
                  {
                    text: "The best gift card trading experience I've ever had. Quick payments and excellent support!",
                    author: "Kofi Asante"
                  },
                  {
                    text: "I love how easy it is to trade my gift cards here. The rates are competitive and payments are instant.",
                    author: "Ama Serwaa"
                  },
                  {
                    text: "This platform has revolutionized how I handle my gift cards. The crypto integration is seamless!",
                    author: "Yaw Osei"
                  },
                  {
                    text: "Outstanding service! My transactions are always processed quickly and the rates are unbeatable.",
                    author: "Efua Mensah"
                  },
                  {
                    text: "The mobile app is incredible. I can trade anywhere, anytime with complete confidence.",
                    author: "Kweku Asante"
                  },
                  {
                    text: "Professional, reliable, and fast. This is the future of gift card trading in Africa.",
                    author: "Ama Serwaa"
                  },
                  {
                    text: "The security features give me peace of mind. I trust this platform with all my transactions.",
                    author: "Kwame Nkrumah"
                  },
                  {
                    text: "Excellent customer support and lightning-fast payouts. Highly recommended!",
                    author: "Akosua Boateng"
                  },
                  {
                    text: "The best rates I've found anywhere. This platform has saved me so much money!",
                    author: "Kojo Asante"
                  }
                ].map((testimonial, index) => (
                  <div 
                    key={`duplicate-${index}`} 
                    className="flex-shrink-0 w-[calc(100vw-3rem)] md:w-80 rounded-2xl p-4 md:p-6 shadow-2xl border border-teal-200/50 snap-center bg-white/80 backdrop-blur-sm relative overflow-hidden"
                  >
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 via-cyan-100/30 to-sky-100/30 rounded-2xl blur-sm"></div>
                    <div className="relative z-10">
                      <div className="mb-4">
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-300/40">
                          <span className="text-white font-bold text-sm">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-700 text-sm">
                            {testimonial.author}
                          </div>
                          <div className="text-slate-500 text-xs">
                            Verified Customer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Download and Start Trading Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,184,166,0.1)_0%,rgba(6,182,212,0.15)_50%,rgba(20,184,166,0.1)_100%)] bg-[length:200%_200%] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-100/30 via-transparent to-cyan-100/30"></div>
        
        <div className="md:px-20 px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl md:h-[60dvh] rounded-2xl md:p-10 pt-10 relative overflow-hidden">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 via-cyan-100/30 to-sky-100/30 rounded-2xl blur-sm"></div>
            
            <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
              <h2 className="md:text-[5dvh] leading-tight text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent mb-4 text-center md:text-start">
                Download and Start<br/>Trading
              </h2>
              <p className="text-slate-600 mb-8 md:text-xl hidden md:block">
                Get the app now and trade your gift cards instantly<br/>with Rich!
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 md:text-md text-sm text-white md:py-5 md:px-8 py-3 px-3 border border-teal-300/50 rounded-full flex items-center shadow-lg shadow-teal-300/30 transition-all duration-200">
                  <img 
                    alt="apple" 
                    loading="lazy" 
                    width="20" 
                    height="10" 
                    decoding="async" 
                    className="object-contain mr-2" 
                    src="/images/apple.png" 
                    style={{ color: 'transparent' }}
                  />
                  Get on iOS
                </button>
                <button className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 md:text-md text-sm text-white md:px-8 py-3 px-3 border border-cyan-300/50 rounded-full flex items-center shadow-lg shadow-cyan-300/30 transition-all duration-200">
                  <img 
                    alt="android" 
                    loading="lazy" 
                    width="20" 
                    height="10" 
                    decoding="async" 
                    className="object-contain mr-2" 
                    src="/images/android.png" 
                    style={{ color: 'transparent' }}
                  />
                  Get on Android
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center relative z-10">
              <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-teal-200/50 bg-white/80 backdrop-blur-sm">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster=""
                >
                  <source src="/videos/v2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rich In The NEWS */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,184,166,0.1)_0%,rgba(6,182,212,0.15)_50%,rgba(20,184,166,0.1)_100%)] bg-[length:200%_200%] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-100/30 via-transparent to-cyan-100/30"></div>
        
        <div className="w-full px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Rich In The NEWS
            </h3>
            <p className="text-slate-600 text-lg mb-12">
              Click any media logo to read what they said about us.
            </p>
            
            {/* Media Carousel */}
            <div className="relative overflow-x-auto overflow-y-visible md:overflow-hidden">
              <div 
                className="flex gap-6 md:gap-12 py-4"
                style={{ 
                  transform: `translateX(-${mediaScrollPosition}px)`,
                  transition: 'none'
                }}
              >
                {/* First set of media logos */}
                {[
                  {
                    name: "Vanguard",
                    url: "https://www.vanguardngr.com/2023/09/the-ultimate-guide-to-selling-gift-cards-online-in-nigeria-and-ghana/",
                    logo: "https://imgur.com/7DlKymB.png"
                  },
                  {
                    name: "Premium Times",
                    url: "https://www.premiumtimesng.com/promoted/625843-how-to-sell-gift-cards-in-nigeria-and-ghana.html?tztc=1",
                    logo: "https://imgur.com/tp1Djrx.png"
                  },
                  {
                    name: "Punch",
                    url: "https://punchng.com/secure-site-to-sell-gift-cards-in-nigeria/",
                    logo: "https://imgur.com/CX3g6O8.png"
                  }
                ].map((media, index) => (
                  <a 
                    key={index}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 mx-3 md:mx-6 group"
                  >
                    <div className="relative flex items-center justify-center" style={{ minHeight: '3rem' }}>
                      <img 
                        alt={media.name}
                        loading="lazy"
                        decoding="async"
                        className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        src={media.logo}
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </a>
                ))}

                {/* Duplicate set for seamless loop */}
                {[
                  {
                    name: "Vanguard",
                    url: "https://www.vanguardngr.com/2023/09/the-ultimate-guide-to-selling-gift-cards-online-in-nigeria-and-ghana/",
                    logo: "https://imgur.com/7DlKymB.png"
                  },
                  {
                    name: "Premium Times",
                    url: "https://www.premiumtimesng.com/promoted/625843-how-to-sell-gift-cards-in-nigeria-and-ghana.html?tztc=1",
                    logo: "https://imgur.com/tp1Djrx.png"
                  },
                  {
                    name: "Punch",
                    url: "https://punchng.com/secure-site-to-sell-gift-cards-in-nigeria/",
                    logo: "https://imgur.com/CX3g6O8.png"
                  }
                ].map((media, index) => (
                  <a 
                    key={`duplicate-${index}`}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 mx-3 md:mx-6 group"
                  >
                    <div className="relative flex items-center justify-center" style={{ minHeight: '3rem' }}>
                      <img 
                        alt={media.name}
                        loading="lazy"
                        decoding="async"
                        className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        src={media.logo}
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </a>
                ))}

                {/* Third set for seamless loop */}
                {[
                  {
                    name: "Vanguard",
                    url: "https://www.vanguardngr.com/2023/09/the-ultimate-guide-to-selling-gift-cards-online-in-nigeria-and-ghana/",
                    logo: "https://imgur.com/7DlKymB.png"
                  },
                  {
                    name: "Premium Times",
                    url: "https://www.premiumtimesng.com/promoted/625843-how-to-sell-gift-cards-in-nigeria-and-ghana.html?tztc=1",
                    logo: "https://imgur.com/tp1Djrx.png"
                  },
                  {
                    name: "Punch",
                    url: "https://punchng.com/secure-site-to-sell-gift-cards-in-nigeria/",
                    logo: "https://imgur.com/CX3g6O8.png"
                  }
                ].map((media, index) => (
                  <a 
                    key={`third-${index}`}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 mx-3 md:mx-6 group"
                  >
                    <div className="relative flex items-center justify-center" style={{ minHeight: '3rem' }}>
                      <img 
                        alt={media.name}
                        loading="lazy"
                        decoding="async"
                        className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        src={media.logo}
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <p className="text-lg md:text-xl text-slate-600">
                Fill out the form and we'll get back to you as soon as possible
              </p>
            </div>
            <div className="bg-white/60 border border-teal-200/50 rounded-2xl p-8 backdrop-blur-sm shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Common Footer with Stats and Footer */}
      <CommonFooter />
    </main>
  );
};

// Main App Component
const App: React.FC = () => {
  // Meta CAPI event handler - WhatsApp 点击转化事件
  const handleWhatsAppClick = () => {
    MetaEvents.whatsAppClick({
      currency: 'USD',
      value: 0
    });
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/how-to-sell-gift-cards-best-rates-nigeria" element={<BlogPost1 />} />
          <Route path="/blog/best-gift-cards-music-lovers-nigeria" element={<BlogPost2 />} />
          <Route path="/blog/where-to-sell-gift-cards-nigeria-best-rate" element={<BlogPost3 />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>

        {/* Fixed Social Media Buttons - Bottom Right (Visible on all pages) */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:gap-4">
          {/* WhatsApp */}
          <a
            href="https://api.whatsapp.com/send?phone=8619972915971&text=Hi%2C%20I%27m%20interested%20in%20trading%20gift%20cards%20on%20Rich%21%20Contact%3A%20%2B86%2019972915971"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
            aria-label="WhatsApp"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-7 h-7 md:w-10 md:h-10 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
            </svg>
          </a>

          {/* Telegram */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#0088cc] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
            aria-label="Telegram"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-7 h-7 md:w-10 md:h-10 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"></path>
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@veryrich429"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
            aria-label="TikTok"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-7 h-7 md:w-10 md:h-10 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-rose-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
            aria-label="Instagram"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-7 h-7 md:w-10 md:h-10 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
            </svg>
          </a>
        </div>
      </div>
    </Router>
  );
};

export default App;