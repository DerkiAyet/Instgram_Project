import React, { useContext } from "react";
import '../Styles/SideNav.css';
import { AppContext } from "../../App";

export const SwitchAppearence = (props) => {

    const { darkMode, setDarkMode } = useContext(AppContext)
  
    const handleChange = () => {
      setDarkMode(!darkMode)
    };
  
    return (
      <div className="switch-appear-container" ref={props.containerRef} >
        <div className="switch-title">
          <div className="logo-container">
            <i class="ri-arrow-left-s-line nav-icon" onClick={() => props.handleHide()} />
            <span>
              Switch appearence
            </span>
          </div>
          {
            darkMode ?
              <i class="ri-moon-line nav-icon"></i>
              :
              <i class="ri-sun-line nav-icon"></i>
          }
  
        </div>
  
        <div className="switch-input-box">
          <div className="switch-input">
            <span style={{ fontWeight: '360' }}>
              Dark mode
            </span>
            <div
              className={`switch-toggle ${darkMode ? 'checked' : ''}`}
              role="switch"
              aria-checked={darkMode}
              onClick={handleChange}
              tabIndex="0"
            >
              <div className="slider"></div>
            </div>
          </div>
        </div>
  
      </div>
    )
  }