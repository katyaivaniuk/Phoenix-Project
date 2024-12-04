import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    const [bridges, setBridges] = useState([]);

    useEffect(() => {
        fetch("/api/bridges")
            .then((response) => response.json())
            .then((data) => setBridges(data))
            .catch((error) => console.error("Error fetching bridge data:", error));
    }, []);

    return (
        <MapContainer center={[48.3794, 31.1656]} zoom={6} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {bridges.map((bridge) => (
                <Marker key={bridge["Bridge ID"]} position={[bridge.Latitude, bridge.Longitude]}>
                    <Popup>
                        <strong>{bridge["Bridge Name"]}</strong>
                        <br />
                        Function: {bridge["Bridge Function"]}
                        <br />
                        Region: {bridge["Region"]}
                        <br />
                        Reconstruction Cost: €{bridge["Reconstruction Costs"].toLocaleString()}
                        <br />
                        Traffic Volume: {bridge["Volume"]}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
