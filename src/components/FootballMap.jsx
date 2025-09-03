import React, { useEffect, useState } from 'react';
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

const FootballMap = ({ onClubSelect, onShowSlidingBlock }) => {
    const [hoveredCity, setHoveredCity] = useState(null);
    const [cityMarkers, setCityMarkers] = useState(cities);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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

    const handleCityClick = (teamId) => {
        const teamMatches = data.filter(match => match.team1.teamId === teamId || match.team2.teamId === teamId);
        const dateOptions = { day: "2-digit", month: "long", year: "numeric" };

        const teamSchedule = teamMatches.map(match => (`${match.team1.teamName} - ${match.team2.teamName} (${new Date(match.matchDateTime).toLocaleDateString("en-GB", dateOptions)})`));
        console.log('Team Schedule:', teamSchedule);
        onClubSelect(teamSchedule);
        onShowSlidingBlock();
    };

    const fetchData = async () => {
        try {
            const res = await fetch("https://api.openligadb.de/getmatchdata/bl1/2025");
            if (!res.ok) throw new Error("Network response was not ok");
            const json = await res.json();
            console.log('json', json);
            setData(json);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

            {cityMarkers.map(({ name, coordinates, logo, teamId }) => (
                <Marker
                    key={name}
                    coordinates={coordinates}
                    onMouseEnter={() => handleMouseEnter(name)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCityClick(teamId)}
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