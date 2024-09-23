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
          <img src="/images/War.jpg" alt="War Image" /> 
        </div>
        <div className="intro-content">
          <img src="/images/Flag1.jpg" alt="Flag Image" className="flag-image" /> 
          <h1 className="large-heading">{data.title}</h1>
          <p>{data.description}</p>
          <button className="cta-button">{data.links}</button>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="news-section">
        <h2>Latest News</h2>
        <div className="news-container">
          <div className="news-item">
            <img src="/images/News.jpeg" alt="News 1" className="news-image" />
            <div className="news-content">
              <h4>Ukraine war: Key power plant near Kyiv destroyed by Russian strikes</h4>
              <p>By Sarah Rainsford in Kharkiv & Laura Gozzi BBC News. A major power plant near Kyiv was completely destroyed by Russian strikes early on...</p>
              <span>April 11, 2024</span>
              <a href="#" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
        </div>

        <div className="news-item">
            <img src="/images/News.jpeg" alt="News 2" className="news-image" />
            <div className="news-content">
              <h4>Russian air assault ravages Ukraine: Trypillia Thermal Power Plant destroyed</h4>
              <p>Another strike hit a key energy plant in Ukraine, causing significant power outages in major cities...</p>
              <span>April 10, 2024</span>
              <a href="#" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>

          <div className="news-item">
            <img src="/images/News.jpeg" alt="News 3" className="news-image" />
            <div className="news-content">
              <h4>Ukraine's infrastructure continues to suffer amid the ongoing conflict</h4>
              <p>The long-standing war has led to the collapse of critical infrastructure, leaving millions without power and water supplies...</p>
              <span>April 9, 2024</span>
              <a href="#" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
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
