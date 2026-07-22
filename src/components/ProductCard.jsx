import { useCart } from '../context/CartContext';

const CATEGORY_STYLE = {
  Ladoo: { emoji: '🍬', bg: 'from-orange-200 to-yellow-100' },
  Chivda: { emoji: '🥣', bg: 'from-yellow-200 to-amber-100' },
  Masale: { emoji: '🌶️', bg: 'from-red-200 to-orange-100' },
  Lonche: { emoji: '🥭', bg: 'from-lime-200 to-yellow-100' },
  'Premix & Mukhwas': { emoji: '🍃', bg: 'from-green-200 to-emerald-100' },
};

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const style = CATEGORY_STYLE[product.category] || { emoji: '🍽️', bg: 'from-brand-mustard/30 to-brand-cream' };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 border border-transparent hover:border-brand-mustard">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className={`w-full h-36 flex items-center justify-center text-5xl bg-gradient-to-br ${style.bg} transition-transform duration-300 group-hover:scale-105`}>
          {style.emoji}
        </div>
      )}

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug">{product.name}</h3>
        <p className="text-xs text-gray-500 flex-1 mt-1 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-brand-orange">
            ₹{product.price}
            <span className="text-xs font-normal text-gray-400">/kg</span>
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-brand-maroon text-white text-xs px-3 py-1.5 rounded-full font-medium hover:bg-brand-orange active:scale-95 transition-all duration-150 shadow-sm hover:shadow-md"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;