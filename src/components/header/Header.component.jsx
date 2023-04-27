import React from "react";
import './header.styles.scss';

import {ReactComponent as ToAppLogo} from "../../assets/toDoApp_logo.svg";

const Header = () => {
    return (
        <div className='header_container'>
            <div className='header_logo_container'>
                <ToAppLogo/>
            </div>
            <div className='user_header_container'>
                <div className='user_name'>Анжела Лондон</div>
                <div className='user_ava_container'>
                    <img className='user_ava' src={require('../../../src/assets/user_photo.jpg')}/>
                </div>
            </div>
        </div>
    )
};

export default Header;
