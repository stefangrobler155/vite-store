// utils/api.js
import axios from "axios";
import CryptoJS from "crypto-js";

const API_URL = import.meta.env.VITE_API_URL;
const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;

// Rest of your code remains the same
const generateOAuthSignature = (url, method = "GET", params = {}) => {
  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Math.floor(Date.now() / 1000);

  const oauthParams = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
    oauth_version: "1.0",
  };

  const allParams = { ...params, ...oauthParams };

  const paramString = Object.keys(allParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
    .join("&");

  const baseUrl = url.split("?")[0];
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(paramString)}`;
  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;

  const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(CryptoJS.enc.Base64);

  return { ...oauthParams, oauth_signature: encodeURIComponent(signature) };
};

const api = axios.create({
  baseURL: API_URL,
});

export const getAllProducts = async (queryParams = {}) => {
  try {
    const url = `${API_URL}/products`;
    const oauthParams = generateOAuthSignature(url, "GET", queryParams);

    const response = await api.get("/products", {
      params: { ...queryParams, ...oauthParams },
    });
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format from API");
    }

    return response.data;
  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error("Failed to fetch products: " + (error.response?.data?.message || error.message));
  }
};


export const getProductById = async (productId) => {
  try {
    const url = `${API_URL}/products/${productId}`;
    const oauthParams = generateOAuthSignature(url, "GET", {}); // No query params needed for single product

    // console.log("Request URL:", url);
    // console.log("OAuth Params:", oauthParams);

    const response = await api.get(`/products/${productId}`, {
      params: oauthParams,
    });

    // console.log("API Response:", response);
    
    if (!response.data || typeof response.data !== "object" || !response.data.id) {
      throw new Error("Invalid product data returned from API");
    }

    return response.data;
  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error("Failed to fetch product: " + (error.response?.data?.message || error.message));
  }
};

export const registerUser = async (userInfo) => {
  try {
    const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
    const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;
    const base64Credentials = btoa(`${consumerKey}:${consumerSecret}`);

    const response = await axios.post(
      import.meta.env.VITE_USER_URL, // Use VITE_USER_URL
      {
        email: userInfo.email,
        username: userInfo.userName,
        password: userInfo.password,
        first_name: userInfo.name.split(' ')[0] || userInfo.name,
        last_name: userInfo.name.split(' ')[1] || '',
      },
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error registering user:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      'https://test.sfgweb.co.za/wp-json/jwt-auth/v1/token', // JWT endpoint (keep as is unless moved to .env)
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    localStorage.setItem('jwt', response.data.token);
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem('jwt');
    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const processTestPayment = async (orderId) => {
  try {
    const response = { success: true, message: 'Test payment processed successfully' };
    return response;
  } catch (error) {
    console.error('Error processing test payment:', error);
    throw error;
  }
};