import React from 'react'
import '../Styles/Profile.css'

function PostProfile( { postImg, postCommentCount, postLikeCount } ) {
    return (
        <div className="post-img-container">
            <img src={ `http://localhost:3001/uploads/${postImg}` } alt="post" />
            <div className="overlay">
                <div className="post-parametres">
                    <i class="ri-heart-fill post-icon">
                        <span>
                            { postLikeCount }
                        </span>
                    </i>
                    <i class="ri-chat-3-fill post-icon">
                        <span>
                            { postCommentCount }
                        </span>
                    </i>
                </div>
            </div>
        </div>
    )
}

export default PostProfile
