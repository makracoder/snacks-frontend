import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-3 flex flex-col">
      <img
        src={product.imageUrl || 'https://via.placeholder.com/300'}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 flex-1">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-orange-600">₹{product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-orange-600 text-white text-sm px-3 py-1 rounded-md hover:bg-orange-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ProductCard;