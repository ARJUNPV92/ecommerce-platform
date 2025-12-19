import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('/products').then(r => setProducts(r.data));
  }, []);

  const create = async () => {
    await axios.post('/products', { name });
    setName('');
    const res = await axios.get('/products');
    setProducts(res.data);
  };

  return (
    <div className="container">
      <h2>Products</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Product name"
      />
      <br />
      <button onClick={create}>Create</button>

      <ul className="admin-list">
        {products.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );

}
