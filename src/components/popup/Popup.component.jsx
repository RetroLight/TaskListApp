import React from "react";
import './popup.styles.scss';

import {ReactComponent as CloseIcon} from '../../assets/close_icon.svg';

const Popup = ({isActive, popup_title, setIsActive, children}) => {
    return (
        <div className={isActive ? 'popup_layer isActive' : 'popup_layer'} onClick={() => setIsActive(false)}>
            <div className={isActive ? 'popup_window active' : 'popup_window'} onClick={e => e.stopPropagation()}>
                <div className="popup_window_header">
                    <div className='popup_title'>
                        <h2>{popup_title}</h2>
                    </div>
                    <div className='close_icon_container'>
                        <CloseIcon className='close_icon' onClick={() => setIsActive(false)}/>
                    </div>
                </div>
                <div className="popup_window_content">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Popup;
