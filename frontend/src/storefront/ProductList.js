import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products').then(r => setProducts(r.data));
  }, []);

  return (
    <div className="container">
      <h2>Store</h2>

      {products.map(p => (
        <div key={p.id} className="product-card">
          <h3>{p.name}</h3>
        </div>
      ))}
    </div>
  );

}
