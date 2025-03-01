import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RegionPage.css';
import { fetchBridgesForRegion } from '../../services/apiService';

function RegionPage() {
    const { regionId } = useParams();
    const [bridges, setBridges] = useState([]);
    const [error, setError] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [showMatrix, setShowMatrix] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedBridgeId, setSelectedBridgeId] = useState(null); // Track which card is toggled



    const staticImages = {
        'donetsk': '/images/static1.jpg',
        'luhansk': '/images/static2.webp',
        'kharkiv': '/images/static3.jpg',
        'kherson': '/images/static4.webp',
        'zaporizhzhia': '/images/static5.webp',
        'mykolaiv': '/images/static6.jpg',
        'dnipropetrovsk': '/images/static7.jpg',
        'odesa': '/images/static8.jpg'
    };


    const ahpSteps = [
        {
            title: "Why AHP Algorithm",
            content: "The Analytic Hierarchy Process (AHP) is a decision-making framework that helps prioritize complex choices by breaking them down into a structured hierarchy of criteria and alternatives. It uses pairwise comparisons and mathematical calculations to assign relative weights, ensuring a logical and data-driven ranking of options. The Analytic Hierarchy Process (AHP) is our chosen method for bridge prioritization because:",
            keyPoints: [
                {
                    title: "Complex Decision Making",
                    description: "AHP breaks down complex decisions into simpler comparisons, making it perfect for evaluating multiple bridges with different characteristics.",
                    icon: "🔄"
                },
                {
                    title: "Scientific Approach",
                    description: "It provides a mathematical foundation for prioritization, removing subjective bias from decision-making.",
                    icon: "📊"
                },
                {
                    title: "Flexibility",
                    description: "AHP can easily adapt to different criteria weights based on regional needs and priorities.",
                    icon: "🔧"
                },
                {
                    title: "Proven Track Record",
                    description: "Used worldwide in infrastructure planning, disaster recovery, and resource allocation.",
                    icon: "🌍"
                }
            ],
            interactive: {
                question: "Why is systematic prioritization important?",
                options: [
                    "Limited resources must be allocated efficiently",
                    "Some bridges are more critical than others",
                    "Recovery speed impacts regional economy",
                    "All of the above"
                ],
                correctAnswer: 3,
                explanation: "Bridge reconstruction requires systematic prioritization because we face limited resources, varying bridge importance, and economic impact considerations."
            }
        },
        {
            title: "Understanding AHP Matrix",
            content: "The Analytic Hierarchy Process starts with a pairwise comparison matrix.",
            matrix: [
                [1, 7, 3],
                [1/7, 1, 1/3],
                [1/3, 3, 1]
            ],
            explanations: {
                "0-1": "Average Car Traffic Volume per Day is 7× more important than Costs",
                "0-2": "Average Car Traffic Volume per Day is 3× more important than Function",
                "1-0": "Costs is 1/7× as important as Average Car Traffic Volume per Day",
                "1-2": "Costs is 1/3× as important as Function",
                "2-0": "Function is 1/3× as important as Average Car Traffic Volume per Day",
                "2-1": "Function is 3× more important than Costs"
            }
        },
        {
            title: "Calculated Weights",
            content: "After mathematical calculations, we get the following weights:",
            weights: [
                { label: "Average Car Traffic Volume per Day", weight: 67, description: "Heaviest weight due to direct impact on population" },
                { label: "Bridge Function", weight: 24, description: "Considers the bridge's role in infrastructure" },
                { label: "Reconstruction Costs", weight: 9, description: "Economic efficiency factor" }
            ]
        },
        {
            title: "Scoring Formula",
            formula: "Score = (0.67 × Average Car Traffic Volume per Day) + (0.24 × Bridge Function) + (0.09 × Reconstruction Cost)"
        }
    ];
    

    useEffect(() => {
        console.log("I'm in use effect");
        fetchBridgesForRegion(regionId)
            .then(data => setBridges(data))
            .catch(err => setError(err.message))

    }, [regionId]);

    const handleToggleInfo = (bridgeId) => {
        setSelectedBridgeId(prevId => (prevId === bridgeId ? null : bridgeId)); // Toggle selected bridge info
    };


    const renderStepContent = () => {
        const step = ahpSteps[activeStep];
        if (!step) return null;

        switch (activeStep) {
            case 0:
                return (
                    <div className="why-ahp-section">
                        <p className="step-intro" style={{ lineHeight: "25px" }}>{step.content}</p>
                        
                        <div className="key-points-grid">
                            {step.keyPoints?.map((point, index) => (
                                <div key={index} className="key-point-card">
                                    <span className="point-icon">{point.icon}</span>
                                    <h4>{point.title}</h4>
                                    <p>{point.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="interactive-quiz">
                            <h4>{step.interactive?.question}</h4>
                            <div className="quiz-options">
                                {step.interactive?.options?.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} 
                                                  ${showExplanation && index === step.interactive.correctAnswer ? 'correct' : ''}
                                                  ${showExplanation && selectedAnswer === index && index !== step.interactive.correctAnswer ? 'incorrect' : ''}`}
                                        onClick={() => {
                                            setSelectedAnswer(index);
                                            setShowExplanation(true);
                                        }}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {showExplanation && (
                                <div className="explanation-box">
                                    {step.interactive?.explanation}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="matrix-section">
                        <p style={{ fontSize: "18px" }}>{step.content}</p>
                        <div className="matrix-container">
                            <table className="comparison-matrix">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Average Car Traffic Volume per Day</th>
                                        <th>Reconstruction Costs</th>
                                        <th>Bridge Function (Highway vs. Railway)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {step.matrix?.map((row, i) => (
                                        <tr key={i}>
                                            <th>{i === 0 ? 'Average Car Traffic Volume per Day' : i === 1 ? 'Reconstruction Costs' : 'Bridge Function (Highway vs. Railway)'}</th>
                                            {row.map((value, j) => (
                                                <td 
                                                    key={j}
                                                    className="matrix-cell"
                                                    onMouseEnter={() => setShowMatrix(`${i}-${j}`)}
                                                    onMouseLeave={() => setShowMatrix(null)}
                                                >
                                                    {value.toFixed(2)}
                                                    {showMatrix === `${i}-${j}` && step.explanations?.[`${i}-${j}`] && (
                                                        <div className="matrix-tooltip">
                                                            {step.explanations[`${i}-${j}`]}
                                                        </div>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="matrix-intro">{" In AHP, decision-makers assign numerical values to compare the importance of each criterion against another, forming a pairwise comparison matrix like the one shown below. These values are then used to calculate priority scores, which help determine the best overall choice. For example, in the matrix below, Average Car Traffic Volume per Day is considered 7 times more important than Reconstruction Costs when prioritizing bridge repairs. The final rankings help ensure that reconstruction decisions are data-driven and aligned with key priorities."}</p>

                    </div>
                );

            case 2:
                return (
                    <div className="weights-section">
                        <p className="weights-intro">{step.content}</p>
                        {step.weights?.map((item, index) => (
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
                );

            case 3:
                return (
                    <div className="formula-section">
                        <div className="formula-display">
                            <p className="formula-intro">{step.content}</p>
                            <div className="formula-box">
                                {step.formula}
                            </div>
                            <div className="formula-explanation">
                                <p style={{ lineHeight: "25px" }}> Each bridge receives a final score based on these weights. This formula combines all three factors with their respective weights to calculate a final priority score for each bridge.Higher scores indicate higher priority for reconstruction.</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

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
                {staticImages[regionId.toLowerCase()] && (
                    <img 
                        src={staticImages[regionId.toLowerCase()]} 
                        alt={`${regionId} Region`} 
                        className="region-image"
                        onError={(e) => console.error('Image failed to load:', e.target.src)} 
                    />
                )}
            </section>
            <section className="region-bridge-section">
                <h2>Reconstruction of Bridges Based on Priority</h2>
                <p>This section allows you to learn about the reconstruction of the bridges in this region and shows which projects are in urgent need of rebuilding.</p>
                <div className="bridge-cards">
                    {bridges.map((bridge) => (
                        <div key={bridge["Bridge ID"]} className="bridge-card">
                            <div className="card-content">
                                {/* Info Icon */}
                                <div className="info-icon" onClick={() => handleToggleInfo(bridge["Bridge ID"])}>ℹ️</div>

                                {/* Card front */}
                            <img src={`/images/${bridge["Bridge ID"]}.jpg`} alt={bridge["Bridge Name"]} />
                            <div className="tooltip-container">
                                <div className={`rank-badge rank-${bridge["Rank"]}`}>
                                    Priority {bridge["Rank"]}
                                </div>
                                <span className="tooltip-text">
                                    Rank {bridge["Rank"]}: Based on AHP score considering traffic volume, reconstruction costs, and function.
                                </span>
                            </div>
                            <h3>{bridge["Bridge Name"]}</h3> 
                            <p><strong>Function:</strong> {bridge["Bridge Function"]}</p>
                            <p><strong>Reconstruction Cost:</strong> €{bridge["Reconstruction Costs"].toLocaleString()}</p>
                            <p><strong>Total Area of Damage:</strong> {bridge["Total Area of the Damage"]} m²</p>
                            <p><strong>Average Traffic Volume:</strong> {bridge["Volume"]} cars/day</p>

                            <p><strong>AHP Score:</strong> {bridge["AHP Score"].toFixed(4)}</p> 
                        </div>
                            {/* Toggle Content */}
                            {selectedBridgeId === bridge["Bridge ID"] && (
                            <div className="bridge-history">
                                <h4>History of Deconstruction</h4>
                                <p>{bridge["Deconstruction History"] || "No history available for this bridge."}</p>
                            </div>
                        )}
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
                        {renderStepContent()}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default RegionPage;
