import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RegionPage.css';

function RegionPage() {
    const { regionId } = useParams();
    const [region, setRegion] = useState(null);
    const [bridges, setBridges] = useState([]);
    const [error, setError] = useState(null);
    const staticImages = [
        '/images/static1.jpg',
        '/images/static2.webp',
        '/images/static3.jpg',
        '/images/static4.webp',
        '/images/static5.webp',
        '/images/static6.jpg',
        '/images/static7.jpg',
    ];

    useEffect(() => {
        const fetchRegionData = async () => {
            try {
                console.log("Fetching data for regionId:", regionId);
                const response = await fetch(`http://127.0.0.1:5000/api/regions/${regionId.toLowerCase()}`);
                const data = await response.json();
                console.log("API response:", data); // Debug response
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
                <p>
                    This section allows you to learn about the reconstruction of the
                    bridges in this region and shows which projects are in urgent need of
                    rebuilding.
                </p>
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
        </div>
    );
}

export default RegionPage;
