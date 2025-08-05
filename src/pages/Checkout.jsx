// src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getUserEmail } from '../utils/api';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndUser = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Cart contents:', storedCart);
        setCart(storedCart);

        const userId = localStorage.getItem('user_id');
        console.log('User ID from localStorage:', userId);
        if (userId) {
          const email = await getUserEmail(userId);
          console.log('Fetched user email:', email);
          setBillingDetails((prev) => ({ ...prev, email }));
        }
      } catch (error) {
        console.error('Error fetching cart or user:', {
          message: error.message,
          stack: error.stack,
        });
        toast.error('Failed to load cart or user data.');
      }
    };
    fetchCartAndUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('user_id');
      console.log('User ID before order creation:', userId);

      const lineItems = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
      }));
      console.log('Line items for order:', lineItems);

      const orderData = {
        payment_method: 'cod',
        payment_method_title: 'Cash on Delivery',
        set_paid: true,
        billing: billingDetails,
        shipping: billingDetails,
        line_items: lineItems,
        customer_id: userId ? parseInt(userId) : 0,
      };
      console.log('Order data being sent:', JSON.stringify(orderData, null, 2));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Basic ${btoa(
              `${import.meta.env.VITE_CONSUMER_KEY}:${import.meta.env.VITE_CONSUMER_SECRET}`
            )}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Order response:', JSON.stringify(response.data, null, 2));
      console.log('Order customer_id:', response.data.customer_id);
      console.log('Order downloads:', response.data.downloads || 'No downloads field');

      localStorage.removeItem('cart');
      setCart([]);
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${response.data.id}`);
    } catch (error) {
      console.error('Checkout error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      toast.error('Checkout failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Checkout</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Billing Details</h2>
          <form onSubmit={handleCheckout}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={billingDetails.first_name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={billingDetails.last_name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter last name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={billingDetails.phone}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address_1" className="form-label">Address</label>
              <input
                type="text"
                id="address_1"
                name="address_1"
                value={billingDetails.address_1}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter address"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter city"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter state"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postcode" className="form-label">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={billingDetails.postcode}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter postcode"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={billingDetails.country}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter country"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Order Summary</h2>
          {cart.length > 0 ? (
            <ul className="list-group">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.name} - Quantity: {item.quantity || 1}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}