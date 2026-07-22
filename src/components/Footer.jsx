function Footer() {
  return (
    <footer className="bg-brand-maroon text-brand-cream mt-10 px-4 py-6 text-sm">
      <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-3 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-brand-mustard mb-1">Season Swaad</h3>
          <p className="opacity-90">Shilpa Kothavade</p>
          <p className="opacity-90">302, Ace Residence, Near Sunshine Auto Sales,<br />RD Circle, Tidke Colony Road, Nashik-422008</p>
        </div>
        <div>
          <h3 className="font-bold text-brand-mustard mb-1">Contact</h3>
          <p className="opacity-90">📞 <a href="tel:9930770760" className="hover:underline">9930770760</a></p>
          <p className="opacity-90">
            💬 <a href="https://wa.me/919326922913" target="_blank" rel="noreferrer" className="hover:underline">WhatsApp: 9326922913</a>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-brand-mustard mb-1">Payment</h3>
          <p className="opacity-90">Cash on Delivery / UPI on Delivery</p>
          <p className="opacity-90 mt-2 italic text-brand-mustard">"सीजन बदले, स्वाद नहीं।"</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;