// frontend/src/components/Home.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';


function Home() {
  const [data, setData] = useState({ title: '', description: '', links: [] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();  // Use the fetchData from apiService
        setData(fetchedData);  // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();  // Invoke loadData to fetch and set the data when the component mounts
  }, []);



  return (
    <section className="content">
      <div className="left-image">
        <img src="/images/War.jpg" alt="War Image" /> {/* Make sure the image paths match */}
      </div>
      <div className="right-content">
        <img src="/images/Flag1.jpg" alt="Flag Image" className="flag-image" /> {/* Correct path to images */}
        <h1 className="large-heading">{data.title}</h1>
        <p>{data.description}</p>
        <button className="cta-button">{data.links}</button>
      </div>
    </section>
  );
}

export default Home;


