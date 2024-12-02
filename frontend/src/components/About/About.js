import React from 'react';
import './About.css'; 

function About() {
    return (
        <div className="about-section">
            <h2>About</h2>
            <div className="about-container">
                <div className="about-text">
                    <h3>My name is Katya Ivaniuk</h3>
                    <p>
                        Hi! I’m Katya, a Ukrainian who is currently studying 
                        in the US and wants to help Ukraine in any way possible. 
                        I am eager to help rebuild and make this process fast and 
                        optimized to ensure Ukraine becomes a better place to live 
                        in the near future.
                    </p>

                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/katerynaivaniuk" target="_blank" rel="noopener noreferrer">
                            <img src="/images/linkedin.png" alt="LinkedIn" />
                        </a>
                        <a href="https://www.linkedin.com/in/katerynaivaniuk" target="_blank" rel="noopener noreferrer">
                            <img src="/images/gmail.png" alt="Gmail" />
                        </a>
                    </div>
                    <a href="https://amenable-ziconium-199.notion.site/Kateryna-Ivaniuk-edf0ea267ec04da392d694baf81e2eb3?pvs=4" target="_blank" rel="noopener noreferrer">
                        <button className="about-button">About Me</button>
                    </a>
                </div>
                <div className="about-photo">
                    <img src="/images/myphoto.jpg" alt="Your Name" />
                </div>
            </div>
        </div>
    );
}

export default About;
