import ClubLogo from './ClubLogo';
import styles from './CityMarker.module.scss';

type CityMarkerProps = {
    cityName: string;
    logoSVG: string;
    isObscured: boolean;
    isHovered: boolean;
};
  
const CityMarker = ({ cityName, logoSVG, isObscured, isHovered }: CityMarkerProps) => {
    return <g>
        {logoSVG ? (
            <ClubLogo
                logoSVG={logoSVG}
                isObscured={isObscured}
            />
            ) : (
            <circle
                className={styles.cityMarker}
                cx={4}
                cy={4}
                r={4}
                opacity={isObscured ? 0.3 : 1}
            />
        )}

        {isHovered && (
            <text
                className={styles.cityLabel}
                x={10}
                y={6}
            >
                {cityName}
            </text>
        )}
    </g>
}

export default CityMarker;