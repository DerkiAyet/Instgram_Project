import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import PostProfile from './PostProfile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ListFollowers from './ListFollowers'
import ListFollowees from './ListsFollowees'

function Profile() {

    const [userInfos, setUserInfos] = useState({
        user: {
            userName: '',
            fullName: '',
            userImg: null,
            bio: ''
        },
        listOfFollowersIds: [],
        listOfFolloweesIds: [],
        posts: []

    })

    useEffect(() => {

        axios.get('http://localhost:3001/auth/get_infos', {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                setUserInfos(res.data)
            })
            .catch((err) => console.error(err.response.data))

    }, [])

    const footerList = ["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy",
        "Terms", "Location", "Instagram Lite", "Threads",
        "Contact Uploading & Non-User Terms", "Meta Verified", "English ▼", "© 2024 Instagram from Meta"]

    const navigate = useNavigate();

    const formatTextWithBreaks = (text) => {
        return text.split('\n').map((line, key) => (
            <React.Fragment key={key}>
                {line}
                <br />
            </React.Fragment>
        ))
    }

    const [showFollowers, setShowFollowers] = useState(false);

    const [showFollowees, setShowFollowees] = useState(false);

    return (
        <div className='profile-container'>
            <div className="profile-page-wrapper">
                <div className="profile-infos">
                    <div className="profile-img">
                        <img
                            src={userInfos.user.userImg ? `http://localhost:3001/uploads/${userInfos.user.userImg}` : "/default_picture.jpeg"}
                            alt="profile" />
                    </div>

                    <div className="profile-parametres">
                        <div className="profile-settings">
                            <span className="profile-username">
                                {userInfos.user.userName}
                            </span>
                            <button className='settings-button' onClick={() => navigate('/accounts/edit')} >
                                Edit profile
                            </button>
                            <button className='settings-button'>
                                View archive
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 profile-icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>

                        <div className="about-profile">
                            <span className='posts-number'>
                                <span className='number-span'> {userInfos.posts.length} </span>
                                posts
                            </span>
                            <span className='followers number' style={{ cursor: 'pointer' }} onClick={() => setShowFollowers(!showFollowers)}>
                                <span className='number-span'> {userInfos.listOfFollowersIds.length} </span>
                                followers
                            </span>
                            <span className='following number' style={{ cursor: 'pointer' }} onClick={() => setShowFollowees(!showFollowees)}>
                                <span className='number-span'> {userInfos.listOfFolloweesIds.length}  </span>
                                following
                            </span>
                        </div>

                        <div className="profile-bio">
                            <span className="profile-fullname">
                                {userInfos.user.fullName}
                            </span>  <br />
                            {formatTextWithBreaks(userInfos.user.bio || "")}
                        </div>
                    </div>
                </div>

                <div className="new-post">
                    <div className="circle-container">
                        <div className="new-post-border">
                            <div className="new-post-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 create-post-icon" style={{ width: ' 60px', height: '60px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                            </div>
                        </div>
                        <span>New</span>
                    </div>
                </div>

                <div className="posts-wrapper">
                    {
                        userInfos.posts.map((post) => (
                            <PostProfile
                                postImg={post.postImg}
                                postCommentCount={post.commentCount}
                                postLikeCount={post.likesCount}
                            />
                        ))
                    }
                </div>

                <footer>
                    {
                        footerList.map((element) => (
                            <span>{element}</span>
                        ))
                    }
                </footer>
            </div>
            {
                showFollowers &&
                <ListFollowers
                    hideList={() => setShowFollowers(false)}
                />
            }
            {
                showFollowees &&
                <ListFollowees
                    hideList={() => setShowFollowees(false)}
                />
            }
        </div>
    )
}

export default Profile
