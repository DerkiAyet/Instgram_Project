import React, { createContext, useContext, useEffect, useState } from 'react';
import '../Styles/TimeLine.css'
import Sugesstions from './Sugesstions';
import axios from 'axios';
import { AppContext } from '../../App';
import { Post } from './Post';
import PostPage from './PostPage';

export const HomePageContext = createContext();

function TimeLine() {

  const [stories, setStories] = useState([])

  useEffect(() => {

    axios.get('http://localhost:3001/auth/user_followers_and_followees', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
    .then((res) => setStories(res.data.followees))
    .catch((err) => console.error(err.response.data.error))

  }, [])

  const { listOfPosts } = useContext(AppContext);

  const [ post, setPost ] = useState({
    postId: 0,
    userId: 0,
    img: '',
    text: '',
    userName: '',
    userImg: '',
    commentCount: 0,
    likesCount: 0,
    show: false
  })

  const [ likedPosts, setLikedPosts ] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3001/likes/user-liked-posts', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
    .then((res) => setLikedPosts(res.data))
    .catch((err) => console.log(err.response.data.error))
    
  }, [])

  return (
    <HomePageContext.Provider value={{ post, setPost, likedPosts, setLikedPosts }} >
      <div className='timeline'>
        <div className="posts-timeline">
          <div className="timeline-left">
            <div className="stories-line">
              {
                stories.map((user) => (
                  <div className="story-border">
                    <div className="story-img-box">
                      <img src={ user.userImg ? `http://localhost:3001/uploads/${user.userImg}` : "default_picture.jpeg" } alt="" />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="posts-container">
              <div className="posts-list-box">
                {
                  listOfPosts.map((post) => (
                    <Post
                      postUserImg={post.userImg}
                      postUserName={post.userName}
                      postUserId={post.userId}
                      postImg={post.postImg}
                      postText={post.postText || ""}
                      postId={post.postId}
                      postCommentCount={post.commentCount}
                      postlikesCount={post.likesCount}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-right">
          <Sugesstions />
        </div>

        {
          post.show &&
          <PostPage />
        }
      </div>
    </HomePageContext.Provider>
  )
}


export default TimeLine
