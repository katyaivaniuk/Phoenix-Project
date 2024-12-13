import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RegionPage.css';

function RegionPage() {
    const { regionId } = useParams();
    const [region, setRegion] = useState(null);
    const [bridges, setBridges] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const staticImages = [
        '/images/static1.jpg',
        '/images/static2.webp',
        '/images/static3.jpg',
        '/images/static4.webp',
        '/images/static5.webp',
        '/images/static6.jpg',
        '/images/static7.jpg',
    ];

    const explanationCards = [
        {
            title: "How Prioritization Works",
            content: "The prioritization of bridges in this region is based on the Analytical Hierarchy Process (AHP) algorithm. This method assigns each bridge a priority score by evaluating three key factors.",
        },
        {
            title: "Traffic Volume",
            content: "Traffic Volume: The number of vehicles or trains using the bridge daily. This reflects the bridge’s importance to regional connectivity.",
        },
        {
            title: "Reconstruction Costs",
            content: "Reconstruction Costs: The estimated cost of rebuilding the bridge. This ensures resources are allocated efficiently.",
        },
        {
            title: "Bridge Function",
            content: "Bridge Function: Whether the bridge serves as a highway, railway, or both. This highlights its role in infrastructure.",
        },
        {
            title: "Conclusion",
            content: "By evaluating these factors, the AHP algorithm ensures the most critical projects are prioritized to maximize regional recovery and impact.",
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? explanationCards.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === explanationCards.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const fetchRegionData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/regions/${regionId.toLowerCase()}`);
                const data = await response.json();
                setRegion(regionId); // Set the region name
                setBridges(data);    // Set the bridges data
            } catch (err) {
                console.error("Error fetching region data:", err);
                setError(err.message);
            }
        };

        fetchRegionData();
    }, [regionId]);

    if (error) {
        return <p>There are no bridges in need of reconstruction.</p>;
    }

    if (!Array.isArray(bridges) || bridges.length === 0) {
        return <p>There are no bridges in need of reconstruction in this region currently.</p>;
    }
    
    return (
        <div className="region-page">
            <section className="region-header">
                <h1>{regionId.charAt(0).toUpperCase() + regionId.slice(1).toLowerCase()} Reconstruction Projects</h1>
                <div className="region-images">
                    {staticImages.map((image, index) => (
                        <img key={index} src={image} alt={`Reconstruction`} className="region-image" />
                    ))}
                </div>
            </section>
            <section className="region-bridge-section">
                <h2>Reconstruction of Bridges Based on Priority</h2>
                <p>This section allows you to learn about the reconstruction of the bridges in this region and shows which projects are in urgent need of rebuilding.</p>
                <div className="bridge-cards">
                    {bridges.map((bridge) => (
                        <div key={bridge["Bridge ID"]} className="bridge-card">
                            <img src={`/images/${bridge["Bridge ID"]}.jpg`} alt={bridge["Bridge Name"]} />
                            <div className="tooltip-container">
                                <div className={`rank-badge rank-${bridge["Rank"]}`}>
                                    Priority {bridge["Rank"]}
                                </div>
                                <span className="tooltip-text">
                                    Rank {bridge["Rank"]}: Based on AHP score considering traffic volume, reconstruction costs, and function.
                                </span>
                            </div>
                            <h3>#{bridge["Rank"]} {bridge["Bridge Name"]}</h3> 
                            <p><strong>Function:</strong> {bridge["Bridge Function"]}</p>
                            <p><strong>Reconstruction Cost:</strong> €{bridge["Reconstruction Costs"].toLocaleString()}</p>
                            <p><strong>Volume:</strong> {bridge["Volume"]}</p>
                            <p><strong>Total Area of Damage:</strong> {bridge["Total Area of the Damage"]} m²</p>
                            <p><strong>AHP Score:</strong> {bridge["AHP Score"].toFixed(4)}</p> 
                        </div>
                    ))}
                </div>
            </section>
            <section className="ahp-carousel-section">
                <div className="carousel-container">
                    <button onClick={handlePrev} className="arrow left-arrow">&#8592;</button>
                    <div className="card">
                        <h3>{explanationCards[currentIndex].title}</h3>
                        <p>{explanationCards[currentIndex].content}</p>
                    </div>
                    <button onClick={handleNext} className="arrow right-arrow">&#8594;</button>
                </div>
            </section>

        </div>
    );
}

export default RegionPage;
