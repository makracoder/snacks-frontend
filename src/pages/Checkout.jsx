import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

function Checkout() {
  const { items, total, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: '', phone: '', email: '', address: '', paymentMethod: 'COD' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return setError('Your cart is empty.');
    setSubmitting(true);
    setError('');
    try {
      const res = await api.post('/orders', { ...form, items });
      clearCart();
      navigate(`/order-confirmation/${res.data.orderId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong placing your order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Cart is empty. Go add some snacks!</p>
      ) : (
        <div className="space-y-2 mb-6">
          {items.map(item => (
            <div key={item.product} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.product, item.quantity - 1)} className="px-2 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
                <button onClick={() => removeFromCart(item.product)} className="text-red-500 text-sm ml-2">Remove</button>
              </div>
            </div>
          ))}
          <p className="text-right font-bold">Total: ₹{total}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="customerName" placeholder="Your Name" required value={form.customerName} onChange={handleChange}
          className="w-full border rounded p-2" />
        <input name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange}
          className="w-full border rounded p-2" />
        <input name="email" type="email" placeholder="Email (optional, for order confirmation)" value={form.email} onChange={handleChange}
          className="w-full border rounded p-2" />
        <textarea name="address" placeholder="Delivery Address" required value={form.address} onChange={handleChange}
          className="w-full border rounded p-2" />
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full border rounded p-2">
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI on Delivery</option>
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" disabled={submitting}
          className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 disabled:opacity-50">
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;