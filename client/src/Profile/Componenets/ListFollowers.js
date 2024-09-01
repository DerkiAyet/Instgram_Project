import React, { useState, useEffect, useRef } from 'react'
import '../Styles/ListFollowers.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function ListFollowers({ hideList }) {

  const [listOfFollowers, setListOfFollowers] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3001/auth/user_followers_and_followees', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
      .then((res) => setListOfFollowers(res.data.followers))
      .catch((err) => console.error(err.response.data.error))

  }, [])

  const [searchInput, setSearchInput] = useState('');

  const followersFilterd = listOfFollowers.filter((follower) => {
    return (
      follower.userName.toLowerCase().startsWith(searchInput.toLowerCase()) ||
      follower.FullName.toLowerCase().startsWith(searchInput.toLowerCase())
    )
  })

  const followersRef = useRef(null);

  useEffect(() => {

    const handleShowFollowers = (e) => {
      if (followersRef.current && !followersRef.current.contains(e.target)) {
        hideList();
      }
    }

    document.addEventListener('mousedown', handleShowFollowers);

    return () => {
      document.removeEventListener('mousedown', handleShowFollowers)
    }

  })

  return (
    <div className='list-followers-container' ref={followersRef}>
      <div className="title">
        <span>
          Followers
        </span>
        <i class="ri-close-line list-icon" style={{ cursor: 'pointer' }} onClick={() => hideList()}></i>
      </div>
      <div className="search-input">
        <input
          type="text"
          id="search-input"
          placeholder='Search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="followers-list">
        {
          followersFilterd.map((follower) => (
            <FollowerAccountLine
              userId={follower.userId}
              userName={follower.userName}
              userImg={follower.userImg}
              fullName={follower.FullName}
              removeFollowerSuccess={() => setListOfFollowers(listOfFollowers.filter((f) => f.userId !== follower.userId))}
            />
          ))
        }
      </div>
    </div>
  )
}

export const FollowerAccountLine = ({ userId, userImg, userName, fullName, removeFollowerSuccess }) => {

  const navigate = useNavigate();

  const removeFollower = () => {
    axios.delete(
      `http://localhost:3001/follow/remove-follower/${userId}`,
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    )
      .then(() => {
        removeFollowerSuccess();
      })
      .catch((err) => console.error(err.response.data.error));
  };

  return (
    <div className="follower-account-line">
      <div className="user-infos-box">
        <div className="img-user-circle">
          <img
            src={userImg ? `http://localhost:3001/uploads/${userImg}` : '/default_picture.jpeg'}
            alt="suggested_account"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/${userName}`)}
          />
        </div>
        <div className="user-parametres">
          <span className="username">
            {userName}
          </span>
          <span className="fullName">
            {fullName}
          </span>
        </div>
      </div>
      <button className="remove-account" onClick={() => removeFollower()}>
        Remove
      </button>
    </div >
  )
}

export default ListFollowers
