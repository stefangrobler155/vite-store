// src/pages/Downloads.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Downloads() {
  const { orderId } = useParams();
  const [downloads, setDownloads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const userId = localStorage.getItem('user_id');
        console.log('Fetching downloads for order:', orderId, 'User ID:', userId);
        if (!token || !userId) {
          toast.error('Please log in to view downloads');
          navigate('/auth');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${import.meta.env.VITE_CONSUMER_KEY}:${import.meta.env.VITE_CONSUMER_SECRET}`
              )}`,
            },
          }
        );
        console.log('Downloads response:', JSON.stringify(response.data, null, 2));
        console.log('Downloads field:', response.data.downloads || 'No downloads field');
        console.log('Order customer_id:', response.data.customer_id);

        setDownloads(response.data.downloads || []);
      } catch (error) {
        console.error('Error fetching downloads:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        toast.error('Failed to load downloads: ' + (error.response?.data?.message || error.message));
        navigate('/my-orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloads();
  }, [orderId, navigate]);

  return (
    <div className="container my-4">
      <h2>Your Downloads for Order #{orderId}</h2>
      {isLoading ? (
        <p>Loading downloads...</p>
      ) : downloads.length === 0 ? (
        <p>No downloadable files found for this order.</p>
      ) : (
        <ul className="list-group">
          {downloads.map((download, index) => (
            <li key={index} className="list-group-item">
              <a href={download.download_url} target="_blank" rel="noopener noreferrer">
                {download.name} (Download)
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}