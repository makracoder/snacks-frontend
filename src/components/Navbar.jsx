import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="bg-brand-maroon text-brand-cream px-4 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.jpeg" alt="Season Swaad" className="h-10 w-10 rounded-full" />
        <span className="text-lg font-bold hidden sm:block">Season Swaad</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/track-order" className="text-sm hover:text-brand-mustard transition">Track Order</Link>
        <Link to="/checkout" className="relative hover:text-brand-mustard transition">
          🛒 Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-brand-mustard text-brand-maroon rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;