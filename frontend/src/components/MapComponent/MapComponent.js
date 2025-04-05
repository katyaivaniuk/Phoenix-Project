import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue for Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchBridges } from "../../services/apiService";

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
        fetchBridges()
        .then(data => setBridges(data))
        .catch((error) => console.error("Error fetching bridge data:", error));
    }, []);

    return (
            <MapContainer
            center={[48.5, 31]} 
            zoom={6}
            minZoom={6}
            maxZoom={12}
            maxBounds={[[44, 21], [53.5, 41]]} 
            maxBoundsViscosity={1.0} 
            style={{ height: "500px", width: "100%" }}
            >

            <TileLayer
            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=Jg6Qk7YcQO3RQherUXPk"
            attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
            />

            {/* Pass bridge data to MapMarkers */}
            <MapMarkers bridges={bridges} />
        </MapContainer>
    );
};

export default MapComponent;
