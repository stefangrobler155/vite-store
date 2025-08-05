// src/pages/OrderConfirmation.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${id}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${import.meta.env.VITE_CONSUMER_KEY}:${import.meta.env.VITE_CONSUMER_SECRET}`
              )}`,
            },
          }
        );
        console.log('Order confirmation response:', JSON.stringify(response.data, null, 2));
        console.log('Order downloads:', response.data.downloads || 'No downloads field');
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        toast.error('Failed to load order details.');
        navigate('/'); // Redirect to home on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  if (isLoading) {
    return <div className="container"><h2>Loading order...</h2></div>;
  }

  if (!order) {
    return <div className="container"><h2>Order not found</h2></div>;
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">Order Confirmation #{order.id}</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Order Details</h2>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> {order.currency_symbol}{order.total}</p>
          <p><strong>Customer:</strong> {order.billing.email}</p>
          <h3>Items</h3>
          <ul className="list-group">
            {order.line_items.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.name} - Quantity: {item.quantity} - Price: {order.currency_symbol}{item.total}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Downloads</h2>
          {order.downloads && order.downloads.length > 0 ? (
            <ul className="list-group">
              {order.downloads.map((download) => (
                <li key={download.id} className="list-group-item">
                  <a href={download.download_url} target="_blank" rel="noopener noreferrer">
                    {download.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No downloads available for this order.</p>
          )}
        </div>
      </div>
    </div>
  );
}