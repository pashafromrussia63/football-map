import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import features from '../assets/features.json';
import CityMarker from './CityMarker';
import { cities } from '../data/cities.ts';

const svgModules = import.meta.glob('../assets/logos/*.svg', { eager: true, import: 'default' });
const svgs = Object.fromEntries(
  Object.entries(svgModules).map(([path, url]) => {
    const name = path.split('/').pop().replace('.svg', '');
    return [name, url];
  })
);

const FootballMap = () => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [cityMarkers, setCityMarkers] = useState(cities);

  const handleMouseEnter = (name) => {
    setHoveredCity(name);
    setCityMarkers((prev) =>
      [...prev].sort((a, b) => (a.name === name ? 1 : 0) - (b.name === name ? 1 : 0))
    );
  };

  const handleMouseLeave = () => {
    setHoveredCity(null);
    setCityMarkers(cities);
  };

  return (
    <ComposableMap
      projection='geoAzimuthalEqualArea'
      projectionConfig={{ rotate: [-10.0, -52.0, 0], scale: 2000 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ZoomableGroup center={[10, 51]} zoom={2}>
        <Geographies geography={features} fill='#D6D6DA' stroke='#FFFFFF' strokeWidth={0.5}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
              />
            ))
          }
        </Geographies>

        {cityMarkers.map(({ name, coordinates, logo }) => (
            <Marker
                key={name}
                coordinates={coordinates}
                onMouseEnter={() => handleMouseEnter(name)}
                onMouseLeave={handleMouseLeave}
            >
                <CityMarker
                    isObscured={hoveredCity && hoveredCity !== name}
                    isHovered={hoveredCity === name}
                    logoSVG={svgs[logo]} 
                    cityName={name}
                />
            </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default FootballMap;