import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('Could not load products. Please try again shortly.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  const grouped = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {Object.keys(grouped).length === 0 && (
        <p className="text-center text-gray-500">No products yet — check back soon!</p>
      )}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;