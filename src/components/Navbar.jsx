import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="bg-orange-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">SeasonSwad</Link>
      <div className="flex gap-4 items-center">
        <Link to="/track-order" className="text-sm hover:underline">Track Order</Link>
        <Link to="/checkout" className="relative">
          🛒 Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-orange-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;