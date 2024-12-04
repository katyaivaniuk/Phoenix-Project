import React from 'react';
import { useParams } from 'react-router-dom';
import './RegionPage.css';

function RegionPage() {
    const { regionId } = useParams();

    const regionData = {
        kharkiv: {
            name: 'Kharkiv',
            images: [
                '/images/kharkiv1.jpg',
                '/images/kharkiv2.jpg',
                '/images/kharkiv3.jpg',
            ],
            description: 'Kharkiv is undergoing major reconstruction projects...',
        },
        kyiv: {
            name: 'Kyiv',
            images: [
                '/images/kyiv1.jpg',
                '/images/kyiv2.jpg',
                '/images/kyiv3.jpg',
            ],
            description: 'Kyiv is focused on restoring vital infrastructure...',
        },
        // Add other regions here
    };

    const region = regionData[regionId];

    if (!region) {
        return <p>Region not found!</p>;
    }

    return (
        <div className="region-page">
            <section className="region-header">
                <h1>{region.name} Reconstruction Projects</h1>
                <p>{region.description}</p>
                <div className="region-images">
                    {region.images.map((img, index) => (
                        <img key={index} src={img} alt={`${region.name} Reconstruction`} />
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
                    {/* Placeholder bridge cards - replace with AHP data later */}
                    <div className="bridge-card">
                        <img src="/images/bridge1.jpg" alt="Bridge 1" />
                        <h3>Staryi Saltiv Dam Bridge</h3>
                        <p>
                            Description of the bridge reconstruction priority and efforts.
                        </p>
                        <p><strong>Reconstruction Cost:</strong> €710,964</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RegionPage;
