import React, { useState } from "react";
import '../Styles/SideNav.css';
import { AccountLine } from "./AccountLine";

export const SearchContainer = () => {

    const accountList = [
        {
            name: 'cristiano',
            bio: 'cristiano ronaldo'
        },
        {
            name: 'cristiano',
            bio: 'cristiano ronaldo'
        },
        {
            name: 'cristiano',
            bio: 'cristiano ronaldo'
        },
        {
            name: 'cristiano',
            bio: 'cristiano ronaldo'
        }
    ]

    const [searchValue, setSearchValue] = useState('');

    const clear = () => setSearchValue('')

    return (
        <div className="search-container">
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
                    {accountList.map((account) => (
                        <AccountLine name={account.name} bio={account.bio} />
                    ))}
                </div>
            </div>

        </div>
    )
}