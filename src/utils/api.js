import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:1337';

// Cấu hình Axios mặc định
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Đang gọi API: ${API_BASE_URL}${endpoint}`);
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
          timeout: 10000, // 10 giây timeout
        });
        console.log('Dữ liệu API nhận được:', response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export const fetchAllJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/vitrilamviets`, {
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/vitrilamviets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Job Details Error:', error);
    throw error;
  }
};

const api = {
  useApi,
  fetchAllJobs,
  fetchJobDetails,
};

export default api; 