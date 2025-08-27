import styles from './ClubLogo.module.scss';

type ClubLogoProps = {
    logoSVG: string;
    isObscured: boolean;
};
  
const ClubLogo = ({ logoSVG, isObscured }: ClubLogoProps) => {
    return (
        <>
            <circle cx={4} cy={4} r={5} fill='white' />
            <image
                className={styles.clubLogo}
                href={logoSVG}
                x={0}
                y={0}
                opacity={isObscured ? 0.3 : 1}
            />
        </>
    );
};

export default ClubLogo;