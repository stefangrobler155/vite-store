import { useCart } from '../../context/CardContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const { addToCart } = useCart();
  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shop</Link></p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <img
                src={item.images[0]?.src}
                alt={item.name}
                style={{ width: '80px', height: 'auto', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <label>
                  Qty:
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    style={{ width: '60px', marginLeft: '0.5rem' }}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  />
                </label>
                <p>Subtotal: ${(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <hr />
          <h2>Total: ${cartTotal.toFixed(2)}</h2>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}
