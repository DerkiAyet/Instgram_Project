import React, { useContext, useRef, useEffect } from 'react';
import '../Styles/DeletePost.css'
import axios from 'axios';
import { AppContext } from '../../App';

function DeletePost({ postId, cancelDelete }) {

    const { setListOfPosts, listOfPosts } = useContext(AppContext);

    const onDelete = () => {

        axios.delete(`http://localhost:3001/posts/delete-post/${postId}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then(() => {
                setListOfPosts(listOfPosts.filter((post) => post.postId !== postId))
                cancelDelete();
            })
            .catch((err) => console.error(err.response.data.error))

    }

    const deletePostRef = useRef(null);

    useEffect(() => {

        const handleShowDeletePost = (e) => {
            if (deletePostRef.current &&
                !deletePostRef.current.contains(e.target)) {

                cancelDelete()

            }
        }

        document.addEventListener('mousedown', handleShowDeletePost);

        return () => {
            document.removeEventListener('mousedown', handleShowDeletePost)
        }

    }, [cancelDelete])


    return (
        <div className='delete-post-container' ref={deletePostRef}>
            <div className="delete-message">
                <span className='delete-title'>
                    Delete Post?
                </span>
                <p>
                    Are you sure you want to delete this post?
                </p>
            </div>
            <button className='delete-btn' onClick={() => onDelete()}>
                Delete
            </button>
            <button className='cancel-btn' onClick={() => cancelDelete()}>
                Cancel
            </button>
        </div>
    )
}

export default DeletePost
