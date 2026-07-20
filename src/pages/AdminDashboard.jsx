import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus, checkAdminAuth, adminLogout } from '../api/admin';

const STATUS_OPTIONS = ['Received', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Rejected'];

const STATUS_COLORS = {
  Received: 'bg-gray-200 text-gray-800',
  Accepted: 'bg-blue-100 text-blue-800',
  Preparing: 'bg-yellow-100 text-yellow-800',
  'Out for Delivery': 'bg-purple-100 text-purple-800',
  Delivered: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800'
};

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadOrders = () => {
    getAllOrders()
      .then(res => setOrders(res.data))
      .catch(() => setError('Could not load orders.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    checkAdminAuth()
      .then(loadOrders)
      .catch(() => navigate('/admin/login'));
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status } : o));
    } catch {
      alert('Failed to update status. Try again.');
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login');
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Orders ({orders.length})</h1>
        <button onClick={handleLogout} className="text-sm text-red-600 underline">Logout</button>
      </div>

      {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.orderId} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold">{order.orderId} — {order.customerName}</p>
                <p className="text-sm text-gray-600">{order.phone}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                {order.status}
              </span>
            </div>

            <ul className="text-sm text-gray-700 mb-2">
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} × {item.quantity} — ₹{item.price * item.quantity}</li>
              ))}
            </ul>

            <p className="text-sm text-gray-600 mb-1">Address: {order.address}</p>
            <p className="text-sm font-semibold mb-3">Total: ₹{order.total} ({order.paymentMethod})</p>

            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(order.orderId, status)}
                  disabled={order.status === status}
                  className={`text-xs px-3 py-1 rounded border ${
                    order.status === status
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white hover:bg-orange-50 border-orange-300 text-orange-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;