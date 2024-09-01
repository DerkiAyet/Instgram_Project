import React, { useRef, useEffect, useState, useContext } from 'react';
import { AppContext } from '../../App';
import { HomePageContext } from './TimeLine';
import '../Styles/PostPage.css';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

function PostPage() {

    const { userAuth, setListOfPosts, listOfFollowees, setListOfFollowees } = useContext(AppContext);

    const { setLikedPosts, likedPosts } = useContext(HomePageContext);

    const { post, setPost } = useContext(HomePageContext);

    //---------------Getting the comments-------------------

    const [comments, setComments] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:3001/comments/by-postId/${post.postId}`)
            .then((res) => {
                setComments(res.data)
            })
            .catch((err) => console.error(err.response.data.error))

    }, [post.postId])

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

    //----------Post Page Ref-------------

    const postPageRef = useRef(null);

    useEffect(() => {

        const handleShowPostPage = (e) => {
            if (postPageRef.current && !postPageRef.current.contains(e.target)) {
                setPost({
                    postId: 0,
                    userId: 0,
                    img: '',
                    text: '',
                    userName: '',
                    userImg: '',
                    show: false
                })
            }
        }

        document.addEventListener('mousedown', handleShowPostPage)

        return () => {
            document.removeEventListener('mousedown', handleShowPostPage)
        }

    }, [setPost])

    //--------------Follow Process---------------

    const addFollow = () => {

        axios.post('http://localhost:3001/follow/add_follow', { followingId: post.userId }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then(() => {
                setListOfFollowees([...listOfFollowees, post.userId])
            })
            .catch((err) => console.error(err.response.data.error))

    }

    const removeFollow = () => {

        axios.delete(`http://localhost:3001/follow/remove_follow/${post.userId}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then(() => {
                setListOfFollowees(listOfFollowees.filter((followee) => followee !== post.userId))
            })
            .catch((err) => console.error(err.response.data.error))

    }

    //----------------Add Comment---------------------------

    const [commentBody, setCommentBody] = useState({
        postId: post.postId,
        commentText: ''
    })

    const onSubmit = (e) => {

        e.preventDefault();
        console.log(commentBody)
        axios.post('http://localhost:3001/comments/add-comment', commentBody, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                setComments([...comments, res.data])
                setCommentBody({ ...commentBody, commentText: '' })
                setListOfPosts((prevPosts) => {
                    return prevPosts.map((p) => {
                        if (p.postId === post.postId) {
                            return {
                                ...p,
                                commentCount: p.commentCount + 1,
                            };
                        }
                        return p;
                    });
                });
            })
            .catch((err) => console.error(err.response.data))

    }

    //------------------Like Process---------

    const likePost = () => {
        axios.post('http://localhost:3001/likes/add-like', { postId: post.postId }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                if (res.data.messageAdd) {
                    setLikedPosts((prevLikedPosts) => [...prevLikedPosts, post.postId]);
                    setPost((prevPost) => ({ ...prevPost, likesCount: prevPost.likesCount + 1 }));
                    setListOfPosts((prevPosts) => {
                        return prevPosts.map((p) => {
                            if (p.postId === post.postId) {
                                return {
                                    ...p,
                                    likesCount: p.likesCount + 1,
                                };
                            }
                            return p;
                        });
                    });
                } else {
                    setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((likedPostId) => likedPostId !== post.postId));
                    setPost((prevPost) => ({ ...prevPost, likesCount: prevPost.likesCount - 1 }));
                    setListOfPosts((prevPosts) => {
                        return prevPosts.map((p) => {
                            if (p.postId === post.postId) {
                                return {
                                    ...p,
                                    likesCount: p.likesCount - 1,
                                };
                            }
                            return p;
                        });
                    });
                }
            })
            .catch((err) => console.error(err.response.data.error))
    }

    //-----------------Emojies State-------------------

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const addEmoji = (emojiObject) => {
        setCommentBody({ ...commentBody, commentText: commentBody.commentText + emojiObject.emoji });
    };

    return (
        <div className='post-page-container' ref={postPageRef}>

            <div className="post-img-container">
                <img
                    src={`http://localhost:3001/uploads/${post.img}`}
                    alt="post"
                />
            </div>

            <div className="post-comments-section">
                <div className="post-owner-line">
                    <div className="post-owner-infos">
                        <div className="post-owner-img">
                            <img
                                src={!post.userImg ? "/default_picture.jpeg" : `http://localhost:3001/uploads/${post.userImg}`}
                                alt="post owner"
                            />
                        </div>
                        <span style={{ fontWeight: '420', fontSize: '1.1rem' }}> {post.userName} </span>
                        {
                            !listOfFollowees.includes(post.userId) &&
                            <span className='demande-follow' style={{ cursor: 'pointer', color: 'rgb(0, 149, 246)' }} onClick={() => addFollow()}>
                                Follow
                            </span>
                        }

                    </div>

                    <i class="ri-more-fill post-icon post-options-icon" onClick={toggleShow} >
                        {
                            showOptions &&
                            <div className="post-options-container" ref={showOptionsRef}>
                                <ul>
                                    {
                                        listOfFollowees.includes(post.userId) &&
                                        <li>
                                            <p
                                                className='serious-action'
                                                style={{ color: 'red', fontWeight: '502' }}
                                                onClick={() => removeFollow()}
                                            >
                                                Unfollow
                                            </p>
                                        </li>
                                    }
                                    {
                                        userAuth.userName === post.userName &&
                                        <>
                                            <li>
                                                <p>Edit</p>
                                            </li>
                                            <li>
                                                <p>Delete</p>
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
                <div className="post-comments-container">
                    <CommentLine commentTxt={post.text || ""} commentUserName={post.userName} commentUserImg={post.userImg} />
                    {
                        comments.map((comment) => (
                            <CommentLine
                                commentTxt={comment.commentText || ""}
                                commentUserName={comment.User.userName}
                                commentUserImg={comment.User.userImg}
                            />
                        ))
                    }
                </div>
                <div className="icons-container">
                    <div className="icons-line">
                        <div className="icons-first-line">
                            <i class={`${likedPosts.includes(post.postId) ? "ri-heart-fill" : "ri-heart-line"} post-icon`} onClick={() => likePost()}></i>
                            <i class="ri-chat-3-line post-icon"></i>
                            <i class="ri-send-plane-line post-icon"></i>
                        </div>
                        <i class='bx bx-bookmark post-icon'></i>
                    </div>
                    <span className='number-likes'>
                        {post.likesCount} likes
                    </span>
                </div>

                <div className="comment-input">
                    <form method='POST' className='add-comment-form' onSubmit={onSubmit}>
                        <i class='bx bx-smile comment-icon'
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            style={{ position: 'relative', cursor: 'pointer' }}
                        >

                            {showEmojiPicker && (
                                <EmojiPicker
                                    className='emojie-picker'
                                    theme='dark'
                                    onEmojiClick={addEmoji}
                                />
                            )}
                        </i>

                        <div className="input-container">
                            <textarea
                                type="text"
                                name="" id=""
                                className="add-comment-input"
                                placeholder='Add a comment...'
                                value={commentBody.commentText}
                                onChange={(e) => setCommentBody({ ...commentBody, commentText: e.target.value })}
                            />
                        </div>
                        <button type='submit' className='post-btn'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const CommentLine = ({ commentTxt, commentUserName, commentUserImg }) => {

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

    return (
        <div className="comment-line">
            <div className="comment-user-img">
                <img
                    src={!commentUserImg ? "/default_picture.jpeg" : `http://localhost:3001/uploads/${commentUserImg}`}
                    alt="comment user"
                />
            </div>
            <div className="comment-content">
                <span className="comment-username"> {commentUserName} </span>
                <span className="comment-txt" style={{ fontWeight: '350' }}>

                    {commentTxt.length > maxLength && !isExpanded
                        ? `${commentTxt.substring(0, maxLength)}...`
                        : formatTextWithLineBreaks(commentTxt)}
                    {commentTxt.length > maxLength && (
                        <span className="read-more" onClick={toggleReadMore}>
                            {isExpanded ? ' less' : ' more'}
                        </span>
                    )}

                </span>
            </div>
        </div>
    )
}

export default PostPage
