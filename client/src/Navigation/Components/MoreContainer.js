import React, { useContext } from "react";
import '../Styles/SideNav.css';
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const MoreContainer = (props) => {

  const { setUserAuth, setListOfFollowees } = useContext(AppContext);

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUserAuth({
      userName: '',
      fullName: '',
      userImg: '',
      state: false
    })
    setListOfFollowees([]); 
    navigate('/login')
  }

  return (
    <div className="more-container" ref={props.containerRef}>
      <ul>
        <li>
          <div className="link">
            <i class="ri-settings-5-fill nav-icon"></i>
            <span>
              settings
            </span>
          </div>
        </li>
        <li>
          <div className="link">
            <i class='bx bx-chart nav-icon'></i>
            <span>
              your activity
            </span>
          </div>
        </li>
        <li>
          <div className="link">
            <i class='bx bx-bookmark nav-icon'></i>
            <span>
              saved
            </span>
          </div>
        </li>
        <li>
          <div className="link" onClick={() => props.handleSwitch()}>
            <i class="ri-moon-line nav-icon"></i>
            <span>
              switch appearence
            </span>
          </div>
        </li>
        <li>
          <div className="link">
            <i class='bx bx-comment-error nav-icon'></i>
            <span style={{ textTransform: 'none' }}>
              Report a problem
            </span>
          </div>
        </li>
        <li>
          <div className="link">
            <span>
              switch accounts
            </span>
          </div>
        </li>
        <li>
          <div className="line-decoration" />
          <button className="logout-btn link" onClick={() => logout()}>
            <span>
              log out
            </span>
          </button>
        </li>
      </ul>

    </div>
  )
}