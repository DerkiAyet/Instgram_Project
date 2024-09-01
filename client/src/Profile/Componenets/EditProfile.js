import React, { useState, useEffect, useContext } from 'react'
import '../Styles/EditProfile.css'
import axios from 'axios';
import { AppContext } from '../../App';

function EditProfile() {

    const [userInfos, setUserInfos] = useState({
        userName: '',
        fulName: '',
        userImg: '',
        bio: '',
        gender: '',
        birthDate: ''
    })

    useEffect(() => {

        axios.get('http://localhost:3001/auth/edit-infos', {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                setUserInfos(res.data.userInfos)
            })
            .catch((err) => console.error(err.response.data))

    }, [])

    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
        setInputType('date');
    };

    const handleBlur = () => {
        setInputType('text');
    };

    const footerList = ["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy",
        "Terms", "Location", "Instagram Lite", "Threads",
        "Contact Uploading & Non-User Terms", "Meta Verified", "English ▼", "© 2024 Instagram from Meta"]

 
    const [imageSelected, setImageSelected] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserInfos({ ...userInfos, userImg: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSelected(reader.result)
            };
            reader.readAsDataURL(file); // used to convert the image into a an url so we can display it in our website
        }
    };

    const { userAuth, setUserAuth } = useContext(AppContext);

    const onSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        if (userInfos.userImg) formData.append('userImg', userInfos.userImg);
        if (userInfos.bio) formData.append('bio', userInfos.bio);
        if (userInfos.gender) formData.append('gender', userInfos.gender);
        if (userInfos.birthDate) formData.append('birthDate', userInfos.birthDate);
        // I did this to make do a partial edit which means I am not obliged to fill all the inputs 

        axios.put('http://localhost:3001/auth/edit-profile', formData, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                setUserAuth({ ...userAuth, userImg: res.data.userImg })
            })
            .catch((err) => {
                console.error(err.response.data.error)
            })
    }

    return (
        <div className='edit-profile-container'>
            <div className="edit-profile-wrapper">
                <span className="edit-profile-title">
                    Edit profile
                </span>
                <form className="edit-profile-form" onSubmit={onSubmit}>
                    <div className="image-input-container">
                        <div className="user-coordinators">
                            <img
                                src={imageSelected || (userInfos.userImg ? `http://localhost:3001/uploads/${userInfos.userImg}` : "/default_picture.jpeg")}
                                alt=""
                            />
                            <div className="user-prametres">
                                <span className="username">
                                    {userInfos.userName}
                                </span>
                                <span className="fullName">
                                    {userInfos.fulName}
                                </span>
                            </div>
                        </div>

                        <div className="input-line">
                            <input
                                type="file"
                                id="img-input"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="img-input">change photo</label>
                        </div>
                    </div>

                    <div className="bio-input-container">
                        <label htmlFor="bio-input">Bio</label>
                        <textarea
                            placeholder='Bio'
                            id='bio-input'
                            value={userInfos.bio || ""}
                            onChange={(e) => setUserInfos({ ...userInfos, bio: e.target.value })}
                        />
                    </div>

                    <div className="gender-input-container">
                        <label htmlFor="gender-input">Gender</label>
                        <select
                            id="gender-input"
                            value={userInfos.gender}
                            onChange={(e) => setUserInfos({ ...userInfos, gender: e.target.value })}
                        >
                            <option value="prefer not to say">Prefer not to say</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <p className="warning">
                            This won’t be part of your public profile.
                        </p>
                    </div>

                    <div className="birthDate-input-container">
                        <label htmlFor="birthDate-input">Birth Day</label>
                        <input
                            type={inputType} placeholder=""
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            id="birthDate-input"
                            value={userInfos.birthDate}
                            onChange={(e) => setUserInfos({ ...userInfos, birthDate: e.target.value })}
                        />
                    </div>

                    <button type="submit" className='submit'>
                        Submit
                    </button>
                </form>
            </div>
            <footer>
                {
                    footerList.map((element) => (
                        <span>{element}</span>
                    ))
                }
            </footer>
        </div>
    )
}

export default EditProfile
