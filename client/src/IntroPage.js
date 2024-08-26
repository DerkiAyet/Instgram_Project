import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import { AppContext } from './App';

function IntroPage({ onTimeout }) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onTimeout();
        }, 3000); // Display intro for 3 seconds

        return () => clearTimeout(timer);
    }, [onTimeout]);

    const { darkMode } = useContext(AppContext);

    return (
        isVisible && (
            <div className={ `introPage ${darkMode ? 'dark-intro' : ''}` }>
                <img
                    src="/instagram_main_logo.svg"
                    alt="instagram_2016_logo"
                    className="main-logo"
                />

                <div className="company-logo">
                    <span>
                        from
                    </span>
                    <div className="meta-company">
                        <i class="ri-meta-fill meta-logo"></i>
                        <span className="gradiant-text">
                            Meta
                        </span>
                    </div>
                </div>
            </div>
        )
    )
}

export default IntroPage
