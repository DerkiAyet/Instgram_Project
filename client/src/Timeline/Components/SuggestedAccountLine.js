import React from "react";
import '../Styles/Sugesstions.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const SuggestedAccountLine = ({ userImg, userName, userId, addFollowSuccess }) => {

    const addFollow = () => {
        axios.post(
            'http://localhost:3001/follow/add_follow',
            { followingId: userId },
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                },
            }
        )
            .then(() => {
                addFollowSuccess();
            })
            .catch((err) => console.error('Error from API:', err.response.data.error));
    };

    const navigate = useNavigate();

    return (
        <div className="suggested-account-line">
            <div className="user-infos-box">
                <div className="img-user-circle">
                    <img
                        src={userImg ? `http://localhost:3001/uploads/${userImg}` : '/default_picture.jpeg'}
                        alt="suggested_account"
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate(`/${userName}`)}
                    />
                </div>
                <div className="user-parametres">
                    <span className="username">
                        {userName}
                    </span>
                    <span className="suggested-for-you">
                        Suggested for you
                    </span>
                </div>
            </div>
            <button className="follow-account" onClick={() => addFollow()}>
                follow
            </button>
        </div >
    )
}
