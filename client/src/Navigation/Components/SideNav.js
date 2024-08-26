import React, { useState, useEffect, useRef, useContext } from 'react';
import '../Styles/SideNav.css';
import { Link } from 'react-router-dom'
import { AppContext } from '../../App';
import { MoreContainer } from './MoreContainer';
import { SearchContainer } from './SearchContainer';
import { SwitchAppearence } from './SwitchAppearence';
import { CreatePost } from './CreatePost';

function SideNav() {

  const { darkMode } = useContext(AppContext);
  const [moreBtnClicked, setMoreBtn] = useState(false);
  const moreContainerRef = useRef('');
  const btnMoreRef = useRef(''); // this is used to fix the issue of the same execution of the useEffect and the toggle handler

  const toggle = (e) => {
    e.stopPropagation(); //to prevent the button click from triggering the handleClickOutside effect
    setMoreBtn(!moreBtnClicked)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreContainerRef.current &&
        !moreContainerRef.current.contains(event.target) &&
        btnMoreRef.current &&
        !btnMoreRef.current.contains(event.target)
      ) {
        setMoreBtn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //----------zoom and minimize the nav------------ //

  const [minimizeNav, setMinimizeNav] = useState(false);

  const minimize = () => setMinimizeNav(!minimizeNav);

  const zoom = () => setMinimizeNav(false)

  // -------The Search Container----------//

  const [activeComponent, setActiveComponent] = useState(null);  // we use this to specify that the button we clicked is the search-button

  const handleButtonClick = (component) => {
    setActiveComponent(prev => (prev === component ? null : component));
  };


  //-------Switch Appearence-------//

  const [switchModeClicked, setSwitchMode] = useState(false);

  const switchModeRef = useRef('');

  useEffect(() => {

    const handleSwitchAppearence = (e) => {
      if (switchModeRef.current && !switchModeRef.current.contains(e.target)) {
        setSwitchMode(false);
      }
    }

    document.addEventListener('mousedown', handleSwitchAppearence);
    return () => {
      document.removeEventListener('mousedown', handleSwitchAppearence)
    } // when a change appear the switchModeRef (the container itself) it remove this eventListener

  }, [])

  const showSwitchMode = () => {
    setMoreBtn(false);
    setSwitchMode(true);
  }

  const hideSwitchMode = () => {
    setSwitchMode(false);
    setMoreBtn(true)
  }

  return (

    <div className="sidenav-container">
      <div className={`sidenav ${minimizeNav ? 'minimize-nav' : ''}`}>
        {
          minimizeNav ?
            <i class="ri-instagram-line application-logo "></i>
            :
            <img
              className="sidenav__logo"
              src={
                darkMode ?
                  'https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png'
                  :
                  '/black_insta_logo.png'
              }
              alt="Instagram Logo"
            />
        }

        <nav>
          <ul>
            <li>
              <Link
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  zoom();
                  handleButtonClick('home')
                }}
              >
                <i class='bx bxs-home nav-icon' ></i>
                <span className={minimizeNav ? 'hide' : ''}>
                  home
                </span>

              </Link>
            </li>
            <li className='search-link'>
              <Link
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  minimize();
                  handleButtonClick('search')
                }}
              >
                <i class='bx bx-search nav-icon' ></i>
                <span className={minimizeNav ? 'hide' : ''} >
                  search
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  zoom();
                  handleButtonClick('explore')
                }}
              >
                <i class='bx bx-compass nav-icon' ></i>
                <span className={minimizeNav ? 'hide' : ''}>
                  explore
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  zoom();
                  handleButtonClick('reels')
                }}
              >
                <i class='bx bxs-videos nav-icon'></i>
                <span className={minimizeNav ? 'hide' : ''}>
                  reels
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  minimize();
                  handleButtonClick('messages')
                }
                }
              >
                <i class="ri-messenger-line nav-icon"></i>
                <span className={minimizeNav ? 'hide' : ''}>
                  messages
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  minimize();
                  handleButtonClick('notifications')
                }
                }
              >
                <i class='bx bx-heart nav-icon'></i>
                <span className={minimizeNav ? 'hide' : ''}>
                  notifications
                </span>
              </Link>
            </li>
            <li>
              <div
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  handleButtonClick('create')
                }}
              >
                <i class='bx bx-message-square-add nav-icon'></i>
                <span className={minimizeNav ? 'hide' : ''}>
                  create
                </span>
              </div>
            </li>
            <li>
              <Link
                to={'/'}
                className={`link ${minimizeNav ? 'minimize-link' : ''}`}
                onClick={() => {
                  zoom();
                  handleButtonClick('profile')
                }}
              >
                <img src="" alt="" className="profile-img" />
                <span className={minimizeNav ? 'hide' : ''}>
                  profile
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="more_btn">
          {moreBtnClicked &&
            <MoreContainer
              containerRef={moreContainerRef}
              handleSwitch={showSwitchMode}
            />
          }

          {
            switchModeClicked &&
            <SwitchAppearence
              containerRef={switchModeRef}
              handleHide={hideSwitchMode}
            />
          }

          <div to={'/'} className={`link ${minimizeNav ? 'minimize-link' : ''}`} ref={btnMoreRef} onClick={toggle}>
            <i class="ri-menu-line nav-icon"></i>
            <span className={minimizeNav ? 'hide' : ''}>
              more
            </span>
          </div>
        </div>
        {
          activeComponent === 'search' &&
          <SearchContainer />
        }

        {
          activeComponent === 'create' &&
          <CreatePost />
        }

      </div>
    </div>


  )
}






export default SideNav
