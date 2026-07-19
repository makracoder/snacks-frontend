import { useState } from 'react';
import api from '../api/axios';

const STATUS_STEPS = ['Received', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered'];

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await api.get('/orders/track', { params: { orderId, phone } });
      setOrder(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Track Your Order</h1>
      <form onSubmit={handleSearch} className="space-y-3 mb-6">
        <input placeholder="Order ID (e.g. SNK-1001)" value={orderId} onChange={e => setOrderId(e.target.value)}
          required className="w-full border rounded p-2" />
        <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
          required className="w-full border rounded p-2" />
        <button type="submit" disabled={loading}
          className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 disabled:opacity-50">
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {order && (
        <div className="bg-white rounded shadow p-4">
          <p className="font-bold mb-2">Order {order.orderId}</p>
          <div className="flex justify-between mb-4">
            {STATUS_STEPS.map(step => (
              <div key={step} className={`text-xs text-center flex-1 ${order.status === step ? 'font-bold text-orange-600' : 'text-gray-400'}`}>
                {step}
              </div>
            ))}
          </div>
          {order.status === 'Rejected' && <p className="text-red-600 font-semibold">This order was rejected.</p>}
          <p className="text-sm text-gray-600">Total: ₹{order.total}</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;