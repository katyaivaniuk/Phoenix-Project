import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; // Use this for development

// Fetch general data
export const fetchData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow to handle it in the component
  }
};

// Fetch latest news
export const fetchNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Rethrow to handle it in the component
  }
};

// Example for posting data
export const postData = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/post`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const fetchFallbackNews = async () => {
  try {
    const response = await fetch('/api/last-three-articles');  // Replace with your endpoint
    const fallbackNews = await response.json();
    return fallbackNews;
  } catch (error) {
    console.error('Error fetching fallback news:', error);
    return [];  // Return an empty array if there is an error
  }
};
