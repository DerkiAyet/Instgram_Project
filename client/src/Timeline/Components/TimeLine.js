import React, { useEffect, useRef, useState } from 'react';
import '../Styles/TimeLine.css'
import Sugesstions from './Sugesstions';

function TimeLine() {

  const stories = Array(8).fill(0);

  return (
    <div className='timeline'>
      <div className="posts-timeline">
        <div className="timeline-left">
          <div className="stories-line">
            {
              stories.map((_, key) => (
                <div className="story-border">
                  <div className="story-img-box">
                    <img src="/default_picture.jpeg" alt="" />
                  </div>
                </div>
              ))
            }
          </div>
          <div className="posts-container">
            <div className="posts-list-box">
              <Post />
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>

      <div className="timeline-right">
        <Sugesstions />
      </div>
    </div>
  )
}

export const Post = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const text = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget 
  tellus tristique bibendum. Donec rutrum sed sem quis venenatis. Proin viverra risus 
  a eros volutpat tempus. Nullam eget erat ut urna cursus vestibulum. Ut egestas, 
  elit sit amet tempus convallis, nulla diam posuere lorem, eget sodales nunc elit 
  quis nisl. Donec mollis nisl tortor, a vulputate libero tempor vel. Vivamus ut 
  felis diam. Duis malesuada tortor vel ligula tempus porttitor. Aenean condimentum 
  tincidunt laoreet. Vivamus vulputate ullamcorper quam. Etiam consequat massa ac 
  metus placerat, ac bibendum lorem vulputate. Phasellus interdum lorem orci, ut 
  pulvinar lectus lobortis eget. Suspendisse potenti. In hac habitasse platea dictumst. 
  Curabitur euismod, justo vel fringilla luctus, felis nisl pellentesque ligula, non 
  faucibus diam odio ut purus. Fusce id orci a velit fermentum accumsan. Sed viverra, 
  libero nec dapibus pulvinar, leo mi varius eros, id rhoncus libero risus at nisi. 
  Ut vehicula volutpat velit, ac volutpat risus rhoncus nec.
`;

  //----------------Show Options------------

  const [showOptions, setShowOptions] = useState(false);

  const toggleShow = () => setShowOptions(!showOptions);

  const showOptionsRef = useRef(null);

  useEffect(() => {

    const handleShowOptions = (e) => {
      if(showOptionsRef.current && !showOptionsRef.current.contains(e.target)){
        setShowOptions(false);
      }
    }

    document.addEventListener('mousedown', handleShowOptions);

    return () => {
      document.removeEventListener('mousedown', handleShowOptions)
    }
  
  }, [])

  return (
    <div className="post-container">
      <div className="post-owner-infos">
        <div className="owner-infos">
          <img
            src="/default_picture.jpeg"
            alt=""
            className="post-user-img"
          />
          <span className="owner-username">
            username
          </span>
          <i class="ri-circle-fill circle-decoration"></i>
          <span className='demande-follow'>
            Follow
          </span>
        </div>
        <i class="ri-more-fill post-icon post-options-icon" style={{ fontSize: "1.5rem" }} onClick={toggleShow}>
          {
            showOptions &&
            <div className="post-options-container" ref={showOptionsRef}>
              <ul>
                <li>
                  <p className='serious-action' style={{ color: 'red', fontWeight: '502' }}>Unfollow</p>
                </li>
                <li>
                  <p>Edit</p>
                </li>
                <li>
                  <p>Delete</p>
                </li>
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
        <img src="/default_picture.jpeg" alt="" className="post-img" />
      </div>
      <div className="icons-line">
        <div className="icons-first-line">
          <i class="ri-heart-line post-icon"></i>
          <i class="ri-chat-3-line post-icon"></i>
          <i class="ri-send-plane-line post-icon"></i>
        </div>
        <i class='bx bx-bookmark post-icon'></i>
      </div>

      <span className='post-number-like'>
        Liked by 0 people.
      </span>

      <div className="post-text-section">

        <span className="post-owner-text">
          Username
        </span>
        <span className="post-text">
          {text.length > maxLength && !isExpanded
            ? `${text.substring(0, maxLength)}...`
            : text}
          {text.length > maxLength && (
            <span className="read-more" onClick={toggleReadMore}>
              {isExpanded ? ' less' : ' more'}
            </span>
          )}
        </span>

        <div className="post-comments-section">
          <span className="number-of-comments">
            View all 32 comments
          </span>

          <form method='POST' className='add-comment-form'>
            <div className="input-container">
              <input type="text" name="" id="" className="add-comment-input" placeholder='Add a comment...' />
              <i class='bx bx-smile comment-icon'></i>
            </div>

          </form>

        </div>

      </div>
    </div>
  )
}

export default TimeLine
