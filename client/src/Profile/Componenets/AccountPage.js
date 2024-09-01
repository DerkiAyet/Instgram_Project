import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/AccountPage.css'
import axios from 'axios';
import PostProfile from './PostProfile';
import { AppContext } from '../../App';

function AccountPage() {

    const { userName } = useParams();

    const { listOfFollowees, setListOfFollowees } = useContext(AppContext);

    const [accountInfos, setAccountInfos] = useState({
        userId: 0,
        userName: '',
        fullName: '',
        userImg: '',
        posts: [],
        followersCount: 0,
        followeesCount: 0
    })

    useEffect(() => {

        axios.get(`http://localhost:3001/auth/infos_byUsername/${userName}`)
            .then((res) => setAccountInfos(res.data.user))
            .catch((err) => console.error(err.response.data))

    }, [userName])

    const addFollow = (userId) => {

        axios.post('http://localhost:3001/follow/add_follow', { followingId: userId }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then(() => {
                setListOfFollowees([...listOfFollowees, userId])
            })
            .catch((err) => console.error(err.response.data.error))

    }

    const footerList = ["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy",
        "Terms", "Location", "Instagram Lite", "Threads",
        "Contact Uploading & Non-User Terms", "Meta Verified", "English ▼", "© 2024 Instagram from Meta"]

    return (
        <div className='Account-page-container'>

            <div className="account-page-wrapper">
                <div className="profile-infos">
                    <div className="profile-img">
                        <img src={accountInfos.userImg ? `http://localhost:3001/uploads/${accountInfos.userImg}` : "/default_picture.jpeg"}
                            alt="profile"
                        />
                    </div>

                    <div className="profile-parametres">
                        <div className="profile-settings">
                            <span className="profile-username">
                                {userName}
                            </span>
                            {
                                listOfFollowees.includes(accountInfos.userId) ?
                                    <button className='settings-button' style={{ padding: '5px 20px' }}>
                                        Unfollow
                                    </button>
                                    :
                                    <button className='settings-button follow-btn' onClick={() => addFollow(accountInfos.userId)}>
                                        Follow
                                    </button>
                            }

                            <button className='settings-button'>
                                Message
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 profile-icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>

                        <div className="about-profile">
                            <span className='posts-number'>
                                <span className='number-span'> {accountInfos.posts.length} </span>
                                posts
                            </span>
                            <span className='followers number'>
                                <span className='number-span'> {accountInfos.followersCount}  </span>
                                followers
                            </span>
                            <span className='following number'>
                                <span className='number-span'>  {accountInfos.followeesCount} </span>
                                following
                            </span>
                        </div>

                        <div className="profile-bio">
                            <span className="profile-fullname">

                            </span>  <br />
                        </div>
                    </div>
                </div>

                <div className="line-deco"></div>

                <div className="posts-wrapper">
                    {
                        accountInfos.posts.map((post) => (
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

        </div>
    )
}

export default AccountPage
