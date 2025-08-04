// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { processTestPayment } from '../utils/api';


export default function Checkout({ cart, handleRemoveItem }) {
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    if (!billingData.firstName || !billingData.email || !billingData.address) {
      toast.error('Please fill in all required billing fields');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        toast.error('Please log in to place an order');
        navigate('/auth');
        return;
      }

      const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
      const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;
      const base64Credentials = btoa(`${consumerKey}:${consumerSecret}`);

      const orderData = {
        billing: {
          first_name: billingData.firstName,
          last_name: billingData.lastName,
          email: billingData.email,
          phone: billingData.phone,
          address_1: billingData.address,
          city: billingData.city,
          postcode: billingData.postcode,
          country: billingData.country,
        },
        line_items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        payment_method: 'order_test',
        payment_method_title: 'Test Payment',
        set_paid: true,
        status: 'completed',
      };

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
          },
        }
      );

      await processTestPayment(orderResponse.data.id);

      const orderDetails = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${orderResponse.data.id}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      const downloads = orderDetails.data.downloads || [];
      if (downloads.length > 0) {
        // Redirect to first download URL
        window.location.href = downloads[0].download_url;
        // Or redirect to downloads page (uncomment to use)
        // navigate(`/downloads/${orderResponse.data.id}`);
      } else {
        toast.warn('No downloadable files found for this order.');
        navigate('/my-orders');
      }

      toast.success('Order placed successfully!');
      localStorage.setItem('cart', JSON.stringify([]));
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error placing order:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      toast.error('Order failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container my-4">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${parseFloat(item.price).toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value))
                        }
                        className="form-control w-25"
                      />
                    </td>
                    <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveItem(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"><strong>Total</strong></td>
                  <td>
                    <strong>
                      ${cart
                        .reduce(
                          (sum, item) =>
                            sum + parseFloat(item.price) * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        <div className="col-md-6">
          <h3>Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={billingData.firstName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={billingData.lastName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={billingData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={billingData.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={billingData.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={billingData.city}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postcode" className="form-label">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={billingData.postcode}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={billingData.country}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}