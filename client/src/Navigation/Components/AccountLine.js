import React from "react";
import '../Styles/SideNav.css';
import { useNavigate } from 'react-router-dom'

export const AccountLine = ({ userName, fullName, userImg, hideSearch }) => {

  const navigate = useNavigate();

  return (
    <div className="account-line" onClick={() => {navigate(`/${userName}`); hideSearch()}} style={{ cursor: 'pointer' }}>
      <div className="account-parametres">
        <img
          src={userImg ? `http://localhost:3001/uploads/${userImg}` : "/default_picture.jpeg"}
          alt=""
          className="profile-img"
        />
        <div className="account-info">
          <p className="account-name">
            {userName}
          </p>
          <p className="account-bio">
            {fullName}
          </p>
        </div>
      </div>
      <i class="ri-close-line delete-account-icon"></i>
    </div>
  )
}