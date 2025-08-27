import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import features from "../assets/features.json";

const svgModules = import.meta.glob('../assets/*.svg', { eager: true, import: 'default' });
const svgs = Object.fromEntries(
  Object.entries(svgModules).map(([path, url]) => {
    const name = path.split('/').pop().replace('.svg', '');
    return [name, url];
  })
);

const initialMarkers = [
  { name: "Augsburg", coordinates: [10.8978, 48.3705], logo: 'augsburg' },
  { name: "Leverkusen", coordinates: [6.9833, 51.0339], logo: 'bayer' },
  { name: "Munich", coordinates: [11.582, 48.1351], logo: 'bayern' },
  { name: "Dortmund", coordinates: [7.466, 51.5136], logo: 'dortmund' },
  { name: "Mönchengladbach", coordinates: [6.4428, 51.1805], logo: 'gladbach' },
  { name: "Frankfurt", coordinates: [8.6821, 50.1109], logo: 'eintracht' },
  { name: "Freiburg", coordinates: [7.8474, 47.999], logo: 'freiburg' },
  { name: "Hamburg (HSV/St. Pauli)", coordinates: [9.9937, 53.5511] },
  { name: "Heidenheim", coordinates: [10.151, 48.6781], logo: 'heidenheim' },
  { name: "Sinsheim/Hoffenheim", coordinates: [8.8768, 49.2542], logo: 'hoffenheim' },
  { name: "Cologne", coordinates: [6.9603, 50.9375], logo: 'koln' },
  { name: "Mainz", coordinates: [8.2711, 49.9929], logo: 'mainz' },
  { name: "Leipzig", coordinates: [12.3731, 51.3397], logo: 'leipzig' },
  { name: "Stuttgart", coordinates: [9.1829, 48.7758], logo: 'stuttgart' },
  { name: "Berlin (Union Berlin)", coordinates: [13.4049, 52.52], logo: 'union' },
  { name: "Bremen", coordinates: [8.8017, 53.0793], logo: 'werder' },
  { name: "Wolfsburg", coordinates: [10.7866, 52.4224], logo: 'wolfsburg' }
];

const MapChart = () => {
  const [hovered, setHovered] = useState(null);
  const [markerState, setMarkerState] = useState(initialMarkers);

  const handleMouseEnter = (name) => {
    setHovered(name);
    setMarkerState((prev) =>
      [...prev].sort((a, b) => (a.name === name ? 1 : 0) - (b.name === name ? 1 : 0))
    );
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setMarkerState(initialMarkers);
  };

  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{ rotate: [-10.0, -52.0, 0], scale: 2000 }}
      style={{ width: "100%", height: "100vh" }}
    >
      <ZoomableGroup center={[10, 51]} zoom={2}>
        <Geographies geography={features} fill="#D6D6DA" stroke="#FFFFFF" strokeWidth={0.5}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
              />
            ))
          }
        </Geographies>

        {markerState.map(({ name, coordinates, logo }) => (
          <Marker
            key={name}
            coordinates={coordinates}
            onMouseEnter={() => handleMouseEnter(name)}
            onMouseLeave={handleMouseLeave}
          >
            <g>
              {logo ? (
                <>
                  <circle cx={4} cy={4} r={5} fill="white" />
                  <clipPath id={`clip-${name}`}>
                    <circle cx={4} cy={4} r={4} />
                  </clipPath>
                  <image
                    href={svgs[logo]}
                    x={0}
                    y={0}
                    width={8}
                    height={8}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                    opacity={hovered && hovered !== name ? 0.3 : 1}
                  />
                </>
              ) : (
                <circle
                  cx={4}
                  cy={4}
                  r={4}
                  fill="#00F"
                  stroke="#fff"
                  strokeWidth={1}
                  style={{ cursor: "pointer" }}
                  opacity={hovered && hovered !== name ? 0.3 : 1}
                />
              )}

              {/* Text */}
              {hovered === name && (
                <text
                  textAnchor="start"
                  x={10}
                  y={6}
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fill: "#f2f2f2",
                    fontSize: "6px",
                    fontWeight: 400,
                    pointerEvents: "none",
                  }}
                >
                  {name}
                </text>
              )}
            </g>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;