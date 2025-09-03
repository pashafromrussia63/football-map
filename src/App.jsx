import React, { useState } from 'react';
import FootballMap from './components/FootballMap';
import SlidingBlock from './components/SlidingBlock';
import styles from './App.module.css';

function App() {
    const [open, setOpen] = useState(false);
    const [matches, setMatches] = useState([]);

    return (
        <div className={styles.map}>
            <FootballMap 
                onClubSelect={setMatches}
                onShowSlidingBlock={() => setOpen(true)}
            />
            <SlidingBlock
                open={open}
                onClose={() => setOpen(false)}
                matches={matches}
            />
        </div>
    );
}

export default App;