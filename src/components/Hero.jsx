function Hero() {
  return (
    <div className="bg-brand-maroon text-brand-cream text-center py-10 px-4">
      <img src="/logo.jpeg" alt="Season Swaad" className="h-24 w-24 rounded-full mx-auto mb-3 border-4 border-brand-mustard" />
      <h1 className="text-2xl font-bold">Season Swaad</h1>
      <p className="text-brand-mustard font-medium mt-1">सीजन बदले, स्वाद नहीं।</p>
      <p className="text-sm mt-3 max-w-md mx-auto opacity-90">
        Authentic homemade Marathi snacks, sweets, and masalas — made fresh, delivered with care.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mt-5">
        <span className="bg-white/10 border border-brand-mustard px-3 py-1 rounded-full text-xs font-medium">🏠 100% Homemade</span>
        <span className="bg-white/10 border border-brand-mustard px-3 py-1 rounded-full text-xs font-medium">🌿 No Preservatives</span>
        <span className="bg-white/10 border border-brand-mustard px-3 py-1 rounded-full text-xs font-medium">👐 Made Fresh After You Order</span>
        <span className="bg-white/10 border border-brand-mustard px-3 py-1 rounded-full text-xs font-medium">💵 Pay on Delivery</span>
      </div>
    </div>
  );
}

export default Hero;