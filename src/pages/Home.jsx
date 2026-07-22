import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';

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

  const grouped = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <div>
      <Hero />

      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading && <p className="text-center py-10">Loading products...</p>}
        {error && <p className="text-center py-10 text-red-600">{error}</p>}
        {!loading && !error && Object.keys(grouped).length === 0 && (
          <p className="text-center text-gray-500">No products yet — check back soon!</p>
        )}
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-bold text-brand-maroon mb-3 border-b-2 border-brand-mustard inline-block pb-1">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
              {items.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;