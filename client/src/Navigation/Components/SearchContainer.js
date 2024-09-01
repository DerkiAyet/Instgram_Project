import React, { useEffect, useState } from "react";
import '../Styles/SideNav.css';
import { AccountLine } from "./AccountLine";
import axios from "axios";

export const SearchContainer = ({ searchRef, hideSearch }) => {

    const [searchValue, setSearchValue] = useState('');

    const clear = () => setSearchValue('')

    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:3001/auth')
            .then((res) => setListOfUsers(res.data))
            .catch((err) => console.error(err.data))

    }, [])

    let filterdUsers = listOfUsers.filter((user) => {
        return (
            user.userName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            user.FullName.toLowerCase().startsWith(searchValue.toLowerCase())
        )
    })

    return (
        <div className="search-container" ref={searchRef}>
            <p>
                Search
            </p>
            <div className='input-container'>
                <input
                    type="text"
                    className="search-input"
                    placeholder='Search'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <i class="ri-close-circle-fill input-icon" onClick={clear}></i>
            </div>
            <div className="line-decoration" />

            <div className="accounts-box">
                <div className="recent-box">
                    <p>Recent</p>
                    <p className='clear-btn'>Clear all</p>
                </div>
                <div className="accounts-list">
                    {
                        searchValue !== '' &&
                        filterdUsers.map((account) => (
                            <AccountLine
                                userName={account.userName}
                                fullName={account.FullName}
                                userImg={account.userImg}
                                hideSearch={() => hideSearch()}
                            />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}