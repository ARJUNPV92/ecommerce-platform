import { useState } from 'react';
import axios from '../api/axios';

export default function Cart() {
  const [coupon, setCoupon] = useState('');

  const applyCoupon = async () => {
    const res = await axios.post('/coupons/preview', {
      code: coupon,
      cart: { total: 1000, items: [] }
    });
    alert('Discount: ' + res.data.discount);
  };

  return (
    <div>
      <h2>Cart</h2>
      <input
        value={coupon}
        onChange={e => setCoupon(e.target.value)}
      />
      <button onClick={applyCoupon}>Preview Coupon</button>
    </div>
  );
}
