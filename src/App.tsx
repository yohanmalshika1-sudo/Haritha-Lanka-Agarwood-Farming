import { useEffect, useState } from 'react';
import { Leaf, Timer, Gift, ArrowRight, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOfferActive, setIsOfferActive] = useState(true);

  useEffect(() => {
    const checkOfferStatus = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const offerStart = new Date(currentYear, 3, 1); // April 1
      const offerEnd = new Date(currentYear, 3, 11); // April 11 (midnight)

      if (now >= offerEnd) {
        setIsOfferActive(false);
        // Auto redirect to main website after April 10
        window.location.href = '/main.html';
        return;
      }

      if (now < offerStart) {
        setIsOfferActive(false);
        return;
      }

      // Calculate time left
      const diff = offerEnd.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsOfferActive(true);
    };

    checkOfferStatus();
    const interval = setInterval(checkOfferStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToOffer = () => {
    document.getElementById('offer-details')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isOfferActive && new Date().getDate() > 10) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 border-2 border-[#C9A962] rounded-full flex items-center justify-center">
            <Leaf className="w-10 h-10 text-[#C9A962]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">Offer Expired</h1>
          <p className="text-[#F5F0E8]/70 mb-6">This special offer has ended. Redirecting to main website...</p>
          <a 
            href="/main.html" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#9A7B3D] text-[#0A0A0A] rounded-full font-semibold hover:shadow-lg hover:shadow-[#C9A962]/30 transition-all"
          >
            Go to Main Website <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#C9A962]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 border border-[#C9A962] rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#C9A962]" />
            </div>
            <div>
              <span className="font-serif text-xl text-white tracking-wide">Haritha Lanka</span>
              <span className="block text-[10px] text-[#C9A962] tracking-[0.3em] uppercase">Plantation</span>
            </div>
          </a>
          <a 
            href="/main.html" 
            className="text-sm text-[#C9A962] hover:text-[#E8D5A3] transition-colors tracking-wide"
          >
            Main Website →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1B4332]/50 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.5)_100%)]" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#C9A962] rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#1B4332] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Limited Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#C9A962] rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#C9A962]">Limited Time Offer</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight">
            20% <span className="text-[#C9A962] italic">FREE</span>
          </h1>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            Agarwood Plants
          </h2>
          
          <p className="text-lg md:text-xl text-[#F5F0E8]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Invest in any package during <span className="text-[#C9A962] font-semibold">April 1-10</span> and receive 
            <span className="text-[#C9A962] font-semibold"> 20% additional plants FREE</span>!
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <div key={index} className="bg-[#141414] border border-[#C9A962]/20 rounded-xl px-6 py-4 min-w-[80px]">
                <div className="font-serif text-3xl md:text-4xl text-[#C9A962]">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs text-[#F5F0E8]/50 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToOffer}
              className="px-8 py-6 bg-gradient-to-r from-[#C9A962] to-[#9A7B3D] text-[#0A0A0A] rounded-full font-semibold text-sm tracking-[0.15em] uppercase hover:shadow-lg hover:shadow-[#C9A962]/40 transition-all flex items-center gap-3"
            >
              <Gift className="w-5 h-5" />
              Invest Now
            </Button>
            <a 
              href="tel:+94724015097"
              className="px-8 py-4 border border-[#C9A962] text-[#C9A962] rounded-full font-semibold text-sm tracking-[0.15em] uppercase hover:bg-[#C9A962] hover:text-[#0A0A0A] transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>

          <p className="mt-6 text-sm text-[#F5F0E8]/50">
            <Timer className="w-4 h-4 inline mr-2" />
            Offer ends April 10, 2026 at midnight
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-[0.2em] uppercase text-[#C9A962]">Scroll</span>
          <div className="w-6 h-10 border-2 border-[#C9A962]/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#C9A962] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Offer Details Section */}
      <section id="offer-details" className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#C9A962] mb-4 relative">
              <span className="absolute -left-16 top-1/2 w-12 h-px bg-gradient-to-r from-transparent to-[#C9A962]" />
              Special Promotion
              <span className="absolute -right-16 top-1/2 w-12 h-px bg-gradient-to-l from-transparent to-[#C9A962]" />
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">How It Works</h2>
            <p className="text-[#F5F0E8]/70 max-w-xl mx-auto">
              Purchase any investment package between April 1-10 and get 20% extra plants absolutely FREE!
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { 
                icon: <CheckCircle className="w-8 h-8" />, 
                title: 'Choose Package', 
                desc: 'Select any investment package from Starter to 1 Acre' 
              },
              { 
                icon: <Gift className="w-8 h-8" />, 
                title: 'Get 20% FREE', 
                desc: 'Receive 20% additional plants at no extra cost' 
              },
              { 
                icon: <Leaf className="w-8 h-8" />, 
                title: 'Start Growing', 
                desc: 'Watch your investment grow with our professional management' 
              }
            ].map((step, index) => (
              <div key={index} className="bg-[#141414] border border-[#C9A962]/10 rounded-2xl p-8 text-center hover:border-[#C9A962]/30 transition-all group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#C9A962]/20 to-[#C9A962]/5 border border-[#C9A962]/30 rounded-full flex items-center justify-center text-[#C9A962] group-hover:bg-[#C9A962] group-hover:text-[#0A0A0A] transition-all">
                  {step.icon}
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{step.title}</h3>
                <p className="text-[#F5F0E8]/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Example Calculation */}
          <div className="bg-gradient-to-br from-[#1B4332]/30 to-[#141414] border border-[#C9A962]/20 rounded-3xl p-8 md:p-12 mb-16">
            <h3 className="font-serif text-2xl md:text-3xl text-white text-center mb-8">Example: 1 Acre Package</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6">
                <div className="text-sm text-[#F5F0E8]/50 uppercase tracking-wider mb-2">Normal Package</div>
                <div className="font-serif text-4xl text-white">800</div>
                <div className="text-[#F5F0E8]/60">Plants</div>
              </div>
              <div className="p-6 border-x border-[#C9A962]/20">
                <div className="text-sm text-[#C9A962] uppercase tracking-wider mb-2">+ 20% FREE</div>
                <div className="font-serif text-4xl text-[#C9A962]">+160</div>
                <div className="text-[#F5F0E8]/60">Extra Plants</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-[#F5F0E8]/50 uppercase tracking-wider mb-2">Total You Get</div>
                <div className="font-serif text-4xl text-[#C9A962]">960</div>
                <div className="text-[#F5F0E8]/60">Plants</div>
              </div>
            </div>
            <div className="text-center mt-8 pt-8 border-t border-[#C9A962]/10">
              <p className="text-[#F5F0E8]/70">
                Same investment, <span className="text-[#C9A962] font-semibold">160 more plants FREE</span>!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a 
              href="/main.html#packages"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C9A962] to-[#9A7B3D] text-[#0A0A0A] rounded-full font-semibold text-sm tracking-[0.15em] uppercase hover:shadow-xl hover:shadow-[#C9A962]/40 transition-all hover:-translate-y-1"
            >
              <Gift className="w-5 h-5" />
              Claim Your 20% FREE Plants
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-sm text-[#F5F0E8]/50">
              You will be redirected to our investment packages page
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#C9A962]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-serif text-2xl text-[#C9A962] mb-2">Haritha Lanka Plantation</div>
          <p className="text-[#F5F0E8]/50 text-sm italic mb-6">"Your Trusted Partner in Agarwood Investment"</p>
          <div className="flex justify-center gap-4 mb-6">
            <a href="tel:+94724015097" className="text-[#C9A962] hover:text-[#E8D5A3] transition-colors">
              +94 72 401 5097
            </a>
          </div>
          <p className="text-xs text-[#F5F0E8]/30">
            © 2026 Haritha Lanka Plantation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
