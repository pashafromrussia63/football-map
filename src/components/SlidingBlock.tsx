import styles from "./SlidingBlock.module.scss";
import CloseIcon from '../assets/close-icon.svg';

export default function SlidingBlock({ open, onClose, matches }: {open: boolean, onClose: () => void, matches: string[]}) {
  return (
   <div className={`${styles.panel} ${open ? styles.open : ''}`}>
        <div
            className={styles.header}
        >
            <img className={styles.closeIcon} src={CloseIcon} onClick={onClose}></img>
            <h2 className={styles.title}>Fixtures</h2>
        </div>
        {Array.isArray(matches) && matches.map(match => (
            <div className={styles.match}>{match}</div>
        ))}
    </div>
  );
}