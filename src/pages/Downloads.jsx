// src/pages/Downloads.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Downloads() {
  const { orderId } = useParams();
  const [downloads, setDownloads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          toast.error('Please log in to view downloads');
          navigate('/auth');
          return;
        }

        const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
        const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;
        const base64Credentials = btoa(`${consumerKey}:${consumerSecret}`);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
          {
            headers: {
              Authorization: `Basic ${base64Credentials}`,
            },
          }
        );

        setDownloads(response.data.downloads || []);
      } catch (error) {
        console.error('Error fetching downloads:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        toast.error('Failed to load downloads: ' + (error.response?.data?.message || error.message));
        navigate('/my-orders');
      }
    };

    fetchDownloads();
  }, [orderId, navigate]);

  return (
    <div className="container my-4">
      <h2>Your Downloads</h2>
      {downloads.length === 0 ? (
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