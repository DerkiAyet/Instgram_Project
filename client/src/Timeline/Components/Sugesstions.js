import React, { useContext, useEffect, useState } from 'react';
import '../Styles/Sugesstions.css'
import { SuggestedAccountLine } from './SuggestedAccountLine';
import { AppContext } from '../../App';
import axios from 'axios';

function Sugesstions() {

  const footerElements = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
    "Locations",
    "Language",
    "Meta verified"
  ]

  const { userAuth } = useContext(AppContext);

  const [listOfUsers, setListOfUsers] = useState([]);
  const {listOfFollowees, setListOfFollowees} = useContext(AppContext);

  useEffect(() => {

    axios.get('http://localhost:3001/auth')
      .then((res) => setListOfUsers(res.data))
      .catch((err) => console.error(err.data))

  }, [])

  let suggestedUsers = listOfUsers.filter((user) => !listOfFollowees.includes(user.userId) && user.userName !== userAuth.userName);

  const followAdded = (id) => {
    setListOfFollowees([ ...listOfFollowees, id ]);
    suggestedUsers = suggestedUsers.filter((user) => !listOfFollowees.includes(user.userId)); 
  }

  return (
    <div className='sugesstions-container'>
      <div className="sugesstions-wrapper">
        <div className="user-acount-line">
          <div className="user-infos-box">
            <div className="img-user-circle">
              <img
                src={userAuth.userImg ? `http://localhost:3001/uploads/${userAuth.userImg}` : '/default_picture.jpeg'}
                alt="profile"
              />
            </div>
            <div className="user-parametres">
              <span className="username">
                {userAuth.userName}
              </span>
              <span className="fullname">
                {userAuth.fullName}
              </span>
            </div>
          </div>
          <button className="switch-account">Switch</button>
        </div>

        <div className="suggested-line">
          Suggested for you
          <button className="see-all">See all</button>
        </div>
        <div className="suggested-accounts">
          {
            suggestedUsers.map((suggestedUser) => (
              <SuggestedAccountLine
                userImg={suggestedUser.userImg}
                userName={suggestedUser.userName}
                userId={suggestedUser.userId}
                addFollowSuccess={() => followAdded(suggestedUser.userId)}
              />
            ))
          }
        </div>

        <footer>

          <div className="footer-links">
            {
              footerElements.map((element) => (
                <span> {element} <i class="ri-circle-fill circle-decoration"></i> </span>

              ))
            }
          </div>

          <div className="app-name-footer">
            <span>
              © 2024 Instagram from Meta
            </span>
          </div>

        </footer>
      </div>
    </div>
  )
}
export default Sugesstions
