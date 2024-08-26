import React from "react";
import '../Styles/SideNav.css';

export const AccountLine = (props) => {
    return (
      <div className="account-line">
        <div className="account-parametres">
          <img src="" alt="" className="profile-img" />
          <div className="account-info">
            <p className="account-name">
              {props.name}
            </p>
            <p className="account-bio">
              {props.bio}
            </p>
          </div>
        </div>
        <i class="ri-close-line delete-account-icon"></i>
      </div>
    )
  }