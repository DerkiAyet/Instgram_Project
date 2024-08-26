import React, { useState } from "react";
import '../Styles/SideNav.css';
import axios from "axios";

export const CreatePost = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [text, setText] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setShowForm(false); // Automatically switch to the next component
            };
            reader.readAsDataURL(file); // used to convert the image into a an url so we can display it in our website
        }
    };

    const handlePostSubmit = async () => {
        if (imageFile && text) {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('text', text);

            try {
                const response = await axios.post('/api/your-endpoint', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        } else {
            alert('Please enter text and select an image.');
        }
    };

    const returnBack = () => {
        setSelectedImage(null);
        setShowForm(true);
        setText('');
    }

    return (

        (showForm ? (
            <div className="create-post-container">

                <div className="title-create">
                    <span>
                        Create new post
                    </span>
                </div>

                <div className="form-create-box">
                    <div className="icons-create-box">
                        <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg" className='create-post-icon'>
                            <path d="M57.5167 12.3959H27.4125C22.716 12.3959 18.2118 14.3546 14.8908 17.8411C11.5699 21.3276 9.70416 26.0564 9.70416 30.9871V57.0147C9.70416 59.4561 10.1622 61.8736 11.0521 64.1292C11.9421 66.3848 13.2464 68.4343 14.8908 70.1606C18.2118 73.6472 22.716 75.6059 27.4125 75.6059H57.5167C59.8422 75.6059 62.1449 75.125 64.2934 74.1907C66.4418 73.2564 68.394 71.887 70.0383 70.1606C71.6827 68.4343 72.9871 66.3848 73.877 64.1292C74.767 61.8736 75.225 59.4561 75.225 57.0147V30.9871C75.225 28.5456 74.767 26.1281 73.877 23.8725C72.9871 21.6169 71.6827 19.5675 70.0383 17.8411C68.394 16.1148 66.4418 14.7453 64.2934 13.811C62.1449 12.8767 59.8422 12.3959 57.5167 12.3959Z" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.5896 62.5921L20.3292 50.6938C21.6036 49.3649 23.2762 48.5391 25.0639 48.3562C26.8517 48.1733 28.6447 48.6444 30.1396 49.6899C31.6345 50.7353 33.4275 51.2065 35.2152 51.0235C37.0029 50.8406 38.6756 50.0148 39.95 48.6859L48.2021 40.0225C50.5732 37.5247 53.7125 35.9927 57.0599 35.6998C60.4073 35.4069 63.7449 36.3723 66.4771 38.4236L75.2958 45.5998M28.2979 37.1966C29.07 37.1966 29.8345 37.0369 30.5478 36.7268C31.2611 36.4166 31.9092 35.9619 32.4551 35.3888C33.001 34.8156 33.4341 34.1352 33.7296 33.3863C34.025 32.6375 34.1771 31.8349 34.1771 31.0243C34.1771 30.2138 34.025 29.4111 33.7296 28.6623C33.4341 27.9134 33.001 27.233 32.4551 26.6599C31.9092 26.0867 31.2611 25.6321 30.5478 25.3219C29.8345 25.0117 29.07 24.8521 28.2979 24.8521C26.7387 24.8521 25.2433 25.5023 24.1407 26.6599C23.0382 27.8174 22.4187 29.3873 22.4187 31.0243C22.4187 32.6613 23.0382 34.2312 24.1407 35.3888C25.2433 36.5463 26.7387 37.1966 28.2979 37.1966Z" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className='create-post-icon'>
                            <path d="M8.33333 25H71.6667M56.6667 8.33337L46.6667 25M33.3333 8.33337L23.3333 25M8.33333 40C8.33333 25.0734 8.33333 17.6067 12.97 12.97C17.6067 8.33337 25.07 8.33337 40 8.33337C54.9267 8.33337 62.3933 8.33337 67.03 12.97C71.6667 17.6067 71.6667 25.07 71.6667 40C71.6667 54.9267 71.6667 62.3934 67.03 67.03C62.3933 71.6667 54.93 71.6667 40 71.6667C25.0733 71.6667 17.6067 71.6667 12.97 67.03C8.33333 62.3934 8.33333 54.93 8.33333 40Z" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M49.8433 49.6501C49.34 51.7401 46.9533 53.2168 42.1767 56.1668C37.5667 59.0201 35.26 60.4501 33.4 59.8734C32.6192 59.624 31.9179 59.1733 31.3667 58.5668C30 57.0668 30 54.1568 30 48.3334C30 42.5101 30 39.6001 31.3667 38.1001C31.9333 37.4801 32.6333 37.0301 33.4 36.7901C35.26 36.2168 37.5667 37.6468 42.18 40.5001C46.9533 43.4534 49.34 44.9301 49.8467 47.0168C50.0535 47.8824 50.0535 48.7845 49.8467 49.6501" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <span>
                        Drag photos and videos here
                    </span>

                    <form className='enter-image-form'>
                        <input
                            type="file"
                            accept="image/*"
                            id='postImg'
                            onChange={handleImageChange}
                        />
                        <label htmlFor="postImg">Select from computer</label>
                    </form>
                </div>

            </div>
        ) : (
            <form className="add-text-to-post-container" onSubmit={handlePostSubmit}>
                <div className="title-create">

                    <i class='bx bx-arrow-back'
                        style={{ fontSize: '1.4rem', cursor: 'pointer' }}
                        onClick={returnBack}
                    />
                    <span>
                        Edit
                    </span>
                    <button type='submit' className="share">
                        Share
                    </button>

                </div>
                <div className="text-post-container">

                    {selectedImage && (
                        <div className='post-img-box'>
                            <img src={selectedImage} alt="Selected" style={{ width: '300px', height: 'auto' }} />
                        </div>
                    )}
                    <form className="form-add-text">
                        <div className="user-parameters">
                            <div className="user-img">
                                <img src="" alt="" />
                            </div>
                            <span className="username">
                                username
                            </span>
                        </div>
                        <textarea
                            type="text"
                            id='text-input'
                            placeholder="Enter your text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </form>

                </div>
            </form>
        ))

    )

}