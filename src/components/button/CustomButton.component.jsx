import React from "react";
import './customButton.styles.scss';

const CustomButton = ({children, onBtnClick, props}) => {
    return (
        <div onClick={() => onBtnClick()} className='custom_button_container'>
            <button>{children}</button>
        </div>
    )
};

export default CustomButton;
