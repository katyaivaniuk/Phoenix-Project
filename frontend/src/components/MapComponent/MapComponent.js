import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue for Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to add multiple markers with popups dynamically
const MapMarkers = ({ bridges }) => {
    const map = useMap();

    useEffect(() => {
        if (!bridges.length) return; // No markers if no bridge data is available

        bridges.forEach((bridge) => {
            // Create marker
            const marker = L.marker([bridge.Latitude, bridge.Longitude]).addTo(map);

            // Add popup to marker
            marker.bindPopup(`
                <b>${bridge["Bridge Name"]}</b><br>
                <a href="/projects/${bridge.Region.toLowerCase()}" target="_blank" rel="noopener noreferrer">
                    Learn more about this bridge
                </a>
            `);
        });

        // Clean up markers on unmount or when data changes
        return () => {
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) map.removeLayer(layer);
            });
        };
    }, [bridges, map]);

    return null; // This component doesn’t render anything directly
};

const MapComponent = () => {
    const [bridges, setBridges] = useState([]);

    // Fetch bridge data from API
    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/bridges") // Replace with your backend API
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Bridges:", data); // Debugging to ensure data is correct
                setBridges(data);
            })
            .catch((error) => console.error("Error fetching bridge data:", error));
    }, []);

    return (
        <MapContainer center={[48.5, 37.5]} zoom={7} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {/* Pass bridge data to MapMarkers */}
            <MapMarkers bridges={bridges} />
        </MapContainer>
    );
};

export default MapComponent;
