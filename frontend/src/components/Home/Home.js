import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';
import './Home.css';  // Ensure your CSS file path is correct

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
      {/* First section with war image, flag, text, and button */}
      <div className="intro-section">
        <div className="intro-image">
          <img src="/images/War.jpg" alt="War Image" /> {/* Make sure the image paths match */}
        </div>
        <div className="intro-content">
          <img src="/images/Flag1.jpg" alt="Flag Image" className="flag-image" /> {/* Correct path to images */}
          <h1 className="large-heading">{data.title}</h1>
          <p>{data.description}</p>
          <button className="cta-button">{data.links}</button>
        </div>
      </div>

      {/* Reconstruction Goals Section */}
      <div className="goals-section">
        <h2>Our Reconstruction Goals</h2>
        <p>Every Contribution Counts</p>
        <div className="goals-container">
          <div className="goal">
            <img src="/images/goal1.png" alt="Raise Awareness" className="goal-image" /> {/* Correct path to image */}
            <h3>Raise Awareness</h3>
            <p>Join us in our mission to rebuild Ukraine. Your time and donation will help us rebuild bridges that have been destroyed. Your contribution will make a significant impact on the future of our children.</p>
          </div>
          <div className="goal">
            <img src="/images/goal2.png" alt="Optimize Resource Allocation" className="goal-image" /> {/* Correct path to image */}
            <h3>Optimize Resource Allocation</h3>
            <p>Distribute limited resources to ensure maximum impact on recovery efforts. This goal focuses on using advanced decision-support tools like AHP to prioritize projects essential for rapid recovery of infrastructure such as roads, bridges, and healthcare facilities.</p>
          </div>
          <div className="goal">
            <img src="/images/goal3.png" alt="Strengthen Community Engagement" className="goal-image" /> {/* Correct path to image */}
            <h3>Strengthen Community Engagement</h3>
            <p>Your time and the spread of information will make a significant impact on our reconstruction efforts. It is crucial to make the world know and remember the damages made to Ukraine by Russia.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
