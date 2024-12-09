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
                const normalizedRegionId = regionId.toLowerCase();
                const response = await fetch(`http://127.0.0.1:5000/api/regions/${normalizedRegionId}`);
                if (!response.ok) {
                    const errorMessage = `Error: ${response.status} - ${response.statusText}`;
                    console.error(errorMessage);
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                console.log("Response data:", data);
                setRegion({ name: regionId }); // Set region name dynamically
                setBridges(data.bridges); // Set bridges for the region
            } catch (err) {
                console.error("Error fetching region data:", err.message);
                setError(err.message);
            }
        };

        fetchRegionData();
    }, [regionId]);

    if (error) {
        return <p>There are no bridges in need of reconstruction.</p>;
    }

    if (!region) {
        return <p>Loading...</p>;
    }

    return (
        <div className="region-page">
            <section className="region-header">
            <h1>{region.name.charAt(0).toUpperCase() + region.name.slice(1).toLowerCase()} Reconstruction Projects</h1>
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
                            <h3>{bridge["Bridge Name"]}</h3>
                            <p><strong>Function:</strong> {bridge["Bridge Function"]}</p>
                            <p><strong>Reconstruction Cost:</strong> €{bridge["Reconstruction Costs"].toLocaleString()}</p>
                            <p><strong>Volume:</strong> {bridge["Volume"]}</p>
                            <p><strong>Total Area of Damage:</strong> {bridge["Total Area of the Damage"]} m²</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default RegionPage;
