import { useParams, Link } from 'react-router-dom';

function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div className="max-w-md mx-auto px-4 py-10 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-2">Order Received! 🎉</h1>
      <p className="text-gray-700 mb-1">Your Order ID:</p>
      <p className="text-xl font-mono font-bold mb-4">{orderId}</p>
      <p className="text-gray-500 mb-6">
        We've received your order and will confirm it shortly. You'll receive an email confirmation soon.
      </p>
      <Link to="/track-order" className="text-orange-600 underline">Track your order</Link>
      <br />
      <Link to="/" className="text-orange-600 underline mt-2 inline-block">Back to Home</Link>
    </div>
  );
}

export default OrderConfirmation;