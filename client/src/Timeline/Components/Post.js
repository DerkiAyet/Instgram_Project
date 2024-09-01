import React, { useState, useContext, useEffect, useRef } from "react";
import '../Styles/TimeLine.css';
import { AppContext } from "../../App";
import axios from "axios";
import { HomePageContext } from "./TimeLine";
import { useNavigate } from "react-router-dom";
import DeletePost from "./DeletePost";


export const Post = ({ postUserImg, postUserName, postUserId, postImg, postText, postId, postCommentCount, postlikesCount }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  //----------------Show Options------------

  const [showOptions, setShowOptions] = useState(false);

  const toggleShow = () => setShowOptions(!showOptions);

  const showOptionsRef = useRef(null);
  const showOptionsBtnRef = useRef(null);

  useEffect(() => {

    const handleShowOptions = (e) => {
      if (showOptionsRef.current &&
        !showOptionsRef.current.contains(e.target) &&
        showOptionsBtnRef.current &&
        !showOptionsBtnRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    }

    document.addEventListener('mousedown', handleShowOptions);

    return () => {
      document.removeEventListener('mousedown', handleShowOptions)
    }

  }, [])


  const { userAuth, setListOfPosts, listOfFollowees, setListOfFollowees } = useContext(AppContext);

  const { setLikedPosts, likedPosts } = useContext(HomePageContext);

  const addFollow = () => {

    axios.post('http://localhost:3001/follow/add_follow', { followingId: postUserId }, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
      .then(() => {
        setListOfFollowees([...listOfFollowees, postUserId])
      })
      .catch((err) => console.error(err.response.data.error))

  }

  const removeFollow = () => {

    axios.delete(`http://localhost:3001/follow/remove_follow/${postUserId}`, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
      .then(() => {
        setListOfFollowees(listOfFollowees.filter((followee) => followee !== postUserId))
      })
      .catch((err) => console.error(err.response.data.error))

  }

  const navigate = useNavigate();

  const navigateToAccount = (postUser) => {
    if (postUser !== userAuth.userName) {
      navigate(`/${postUser}`)
    } else {
      navigate('/profile')
    }
  }

  const { setPost } = useContext(HomePageContext)

  const showPostPage = () => {
    setPost({
      postId: postId,
      userId: postUserId,
      img: postImg,
      text: postText,
      userName: postUserName,
      userImg: postUserImg,
      commentCount: postCommentCount,
      likesCount: postlikesCount,
      show: true
    })
  }

  //-----------------Likes------------------

  const likePost = () => {
    axios.post('http://localhost:3001/likes/add-like', { postId: postId }, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
      .then((res) => {
        if (res.data.messageAdd) {
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
          setListOfPosts((prevPosts) => {
            return prevPosts.map((post) => {
              if (post.postId === postId) {
                return {
                  ...post,
                  likesCount: post.likesCount + 1,
                };
              }
              return post;
            });
          });
        } else {
          setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((likedPostId) => likedPostId !== postId));
          setListOfPosts((prevPosts) => {
            return prevPosts.map((post) => {
              if (post.postId === postId) {
                return {
                  ...post,
                  likesCount: post.likesCount - 1,
                };
              }
              return post;
            });
          });
        }

      })
      .catch((err) => console.error(err.response.data.error))
  }

  //---------------Delete Post----------------

  const [showDelete, setShowDelete] = useState(false);

  const toggleShowDelete = () => setShowDelete(!showDelete)

  return (
    <div className="post-container">
      <div className="post-owner-infos">
        <div className="owner-infos" style={{ cursor: 'pointer' }}>
          <img
            src={!postUserImg ? "/default_picture.jpeg" : `http://localhost:3001/uploads/${postUserImg}`}
            alt="post"
            className="post-user-img"
            onClick={() => navigateToAccount(postUserName)}
          />
          <span className="owner-username" onClick={() => navigateToAccount(postUserName)} >
            {postUserName}
          </span>
          <i class="ri-circle-fill circle-decoration"></i>
          {
            userAuth.userName !== postUserName &&
            !listOfFollowees.includes(postUserId) &&
            <span className='demande-follow' style={{ cursor: 'pointer' }} onClick={() => addFollow()}>
              Follow
            </span>
          }

        </div>
        <i class="ri-more-fill post-icon post-options-icon"
          style={{ fontSize: "1.5rem" }}
          onClick={toggleShow}
          ref={showOptionsBtnRef}
        >
          {
            showOptions &&
            <div className="post-options-container" ref={showOptionsRef}>
              <ul>
                {
                  listOfFollowees.includes(postUserId) &&
                  <li>
                    <p
                      className='serious-action'
                      style={{ color: 'rgb(237, 73, 86)', fontWeight: '500' }}
                      onClick={() => removeFollow()}
                    >
                      Unfollow
                    </p>
                  </li>
                }
                {
                  userAuth.userName === postUserName &&
                  <>
                    <li>
                      <p>Edit</p>
                    </li>
                    <li onClick={toggleShowDelete}>
                      <p style={{ color: 'rgb(237, 73, 86)', fontWeight: '500' }}>Delete</p>
                    </li>
                  </>
                }
                <li>
                  <p>Go to post</p>
                </li>
                <li>
                  <p>About Account</p>
                </li>
                <li style={{ borderBottom: 'none' }}>
                  <p>Cancel</p>
                </li>
              </ul>
            </div>
          }

        </i>

      </div>
      <div className="post-img-container">
        <img src={`http://localhost:3001/uploads/${postImg}`}
          alt="post"
          className="post-img"
          onClick={showPostPage}
        />
      </div>
      <div className="icons-line">
        <div className="icons-first-line">
          <i class={`${likedPosts.includes(postId) ? "ri-heart-fill" : "ri-heart-line"} post-icon`} onClick={() => likePost()}></i>
          <i class="ri-chat-3-line post-icon" onClick={showPostPage}></i>
          <i class="ri-send-plane-line post-icon"></i>
        </div>
        <i class='bx bx-bookmark post-icon'></i>
      </div>

      <span className='post-number-like'>
        Liked by {postlikesCount} people.
      </span>

      <div className="post-text-section">

        <span className="post-owner-text">
          {postUserName}
        </span>
        <span className="post-text">
          {postText.length > maxLength && !isExpanded
            ? `${postText.substring(0, maxLength)}...`
            : formatTextWithLineBreaks(postText)}
          {postText.length > maxLength && (
            <span className="read-more" onClick={toggleReadMore}>
              {isExpanded ? ' less' : ' more'}
            </span>
          )}
        </span>

        <div className="post-comments-section">
          <span style={{ cursor: 'pointer' }} className="number-of-comments" onClick={showPostPage}>
            {
              postCommentCount !== 0 &&
              `View all ${postCommentCount} comments`
            }

          </span>

          <form method='POST' className='add-comment-form'>
            <div className="input-container">
              <input type="text" name="" id="" className="add-comment-input" placeholder='Add a comment...' />
              <i class='bx bx-smile comment-icon'></i>
            </div>

          </form>

        </div>

      </div>
      {
        showDelete &&
        <DeletePost
          postId={postId}
          cancelDelete={() => setShowDelete(false)}
        />
      }

    </div>
  )
}