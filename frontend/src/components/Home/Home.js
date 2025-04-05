// Home.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import '../News/News.css';

function Home({ news }) {
  const [data, setData] = useState({ title: '', description: '', links: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();  // Fetch static data
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();  // Fetch static data when the component mounts
  }, []);

  function useCounter(target, duration = 2000) {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let start = 0;
      const increment = target / (duration / 30); // 30ms per frame
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 30);
  
      return () => clearInterval(timer);
    }, [target, duration]);
  
    return count.toLocaleString();
  }

  return (
    <section className="content">
      {/* First section with war image, flag, text, and button */}
      <div className="intro-section">
        <div className="intro-image">
          <img src="/images/War.jpg" alt="War Image" />
        </div>
        <div className="intro-content">
          <img src="/images/Flag1.jpg" alt="Flag Image" className="flag-image" />
          <h1 className="large-heading">{data.title}</h1>
          <p>{data.description}</p>
          <button 
            className="cta-button" 
            onClick={() => navigate("/projects")}
          >
            {data.links[0]}
          </button>

        </div>
      </div>

      <div className="impact-section">
        <h2 className="impact-heading">Quantifying the Destruction</h2>
        <p className="impact-description">
          Since 2014, the war has devastated Ukraine's infrastructure. We aim to spotlight the scale of destruction and why bridges are key to rebuilding.
        </p>

        <div className="horizontal-counters">
          <div className="impact-card">
            <h3>{useCounter(144000)} km</h3>
            <p>Roads Destroyed</p>
          </div>
          <div className="impact-card">
            <h3>{useCounter(1242)}</h3>
            <p>Bridges Damaged</p>
          </div>
          <div className="impact-card">
            <h3>${useCounter(92.1)}B</h3>
            <p>Infrastructure Damage</p>
          </div>
          <div className="impact-card">
            <h3>{useCounter(57)}%</h3>
            <p>Residents Displaced</p>
          </div>
        </div>

      <div className="bridge-focus-text">
        <h3>Why Focus on Bridges?</h3>
        <p>
          Bridges are the backbone of Ukraine’s transportation network. Reconstructing them helps reconnect cities, enable trade, and allow humanitarian aid to reach the most affected regions. With ports blockaded and roads damaged, land transport has become more vital than ever. Bridge rebuilding is key to Ukraine’s recovery — not just physically, but economically and socially.
        </p>
        <button className="cta-button-red" onClick={() => navigate("/projects")}>
          Explore Bridge Projects
        </button>

      </div>
    </div>




      {/* Reconstruction Goals Section */}
      <div className="goals-section">
        <h2>Our Reconstruction Goals</h2>
        <p>Every Contribution Counts</p>
        <div className="goals-container">
          <div className="goal">
            <img src="/images/Peace.png" alt="Raise Awareness" className="goal-image" />
            <h4>Raise Awareness</h4>
            <p>Join us in our mission to rebuild Ukraine. Your time and donation will help us rebuild bridges that have been destroyed. Your contribution will make a significant impact on the future of our children.</p>
          </div>
          <div className="goal">
            <img src="/images/Peace.png" alt="Optimize Resource Allocation" className="goal-image" />
            <h4>Optimize Resource Allocation</h4>
            <p>Distribute limited resources to ensure maximum impact on recovery efforts. This goal focuses on using advanced decision-support tools like AHP to prioritize projects essential for rapid recovery of infrastructure such as roads, bridges, and healthcare facilities.</p>
          </div>
          <div className="goal">
            <img src="/images/Peace.png" alt="Strengthen Community Engagement" className="goal-image" />
            <h4>Strengthen Community Engagement</h4>
            <p>Your time and the spread of information will make a significant impact on our reconstruction efforts. It is crucial to make the world know and remember the damages made to Ukraine by Russia.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
