import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RegionPage.css';

function RegionPage() {
    const { regionId } = useParams();
    const [region, setRegion] = useState(null);
    const [bridges, setBridges] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [showMatrix, setShowMatrix] = useState(false);

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
            content: "Traffic Volume: The number of vehicles or trains using the bridge daily. This reflects the bridge's importance to regional connectivity.",
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

    const ahpSteps = [
        {
            title: "Understanding AHP Matrix",
            content: "The Analytic Hierarchy Process starts with a pairwise comparison matrix:",
            matrix: [
                [1, 7, 3],
                [1/7, 1, 1/3],
                [1/3, 3, 1]
            ],
            explanation: [
                "7 in position (1,2) means: Traffic Volume is 7× more important than Costs",
                "3 in position (1,3) means: Traffic Volume is 3× more important than Function",
                "3 in position (2,3) means: Function is 3× more important than Costs"
            ]
        },
        {
            title: "Calculated Weights",
            content: "After mathematical calculations, we get the following weights:",
            weights: [
                { label: "Traffic Volume", weight: 67, description: "Heaviest weight due to direct impact on population" },
                { label: "Bridge Function", weight: 24, description: "Considers the bridge's role in infrastructure" },
                { label: "Reconstruction Costs", weight: 9, description: "Economic efficiency factor" }
            ]
        },
        {
            title: "Scoring Formula",
            content: "Each bridge receives a final score based on these weights:",
            formula: "Score = (0.67 × Traffic) + (0.24 × Function) + (0.09 × Cost)"
        }
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
            <section className="ahp-explanation-section">
                <h2>Bridge Prioritization Algorithm</h2>
                
                <div className="ahp-interactive-container">
                    <div className="ahp-navigation">
                        {ahpSteps.map((step, index) => (
                            <div 
                                key={index}
                                className={`step-indicator ${activeStep === index ? 'active' : ''}`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="step-number">{index + 1}</div>
                                <div className="step-title">{step.title}</div>
                            </div>
                        ))}
                    </div>

                    <div className="ahp-content">
                        {activeStep === 0 && (
                            <div className="matrix-section">
                                <p className="matrix-intro">{ahpSteps[0].content}</p>
                                <div className="matrix-container">
                                    <div className="matrix-labels">
                                        <div className="matrix-corner"></div>
                                        <div>Traffic</div>
                                        <div>Costs</div>
                                        <div>Function</div>
                                    </div>
                                    {ahpSteps[0].matrix.map((row, i) => (
                                        <div key={i} className="matrix-row">
                                            <div className="row-label">
                                                {i === 0 ? 'Traffic' : i === 1 ? 'Costs' : 'Function'}
                                            </div>
                                            {row.map((value, j) => (
                                                <div 
                                                    key={j} 
                                                    className="matrix-cell"
                                                    onMouseEnter={() => setShowMatrix(`${i}-${j}`)}
                                                    onMouseLeave={() => setShowMatrix(null)}
                                                >
                                                    {typeof value === 'number' ? value.toFixed(2) : value}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="matrix-explanation">
                                    {showMatrix && (
                                        <div className="explanation-popup">
                                            {ahpSteps[0].explanation[showMatrix]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div className="weights-section">
                                {ahpSteps[1].weights.map((item, index) => (
                                    <div key={index} className="weight-item">
                                        <div className="weight-header">
                                            <span className="weight-label">{item.label}</span>
                                            <span className="weight-value">{item.weight}%</span>
                                        </div>
                                        <div className="weight-bar-container">
                                            <div 
                                                className="weight-bar"
                                                style={{ width: `${item.weight}%` }}
                                            />
                                        </div>
                                        <p className="weight-description">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div className="formula-section">
                                <div className="formula-display">
                                    <p className="formula-intro">{ahpSteps[2].content}</p>
                                    <div className="formula-box">
                                        {ahpSteps[2].formula}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RegionPage;
