import React from "react";
import './customInput.styles.scss';

const CustomInput = ({type, inputValue, radioValue, isRadioChecked, label, name, handleChangeRadio, onInput, placeholder}) => {

    const handleChange = e => {
        const { id } = e.currentTarget;
        handleChangeRadio(id);
    };

    {
        switch (type) {
            case 'text':
                return (
                    <div className='custom_input'>
                        <input onChange={(e) => onInput(e.target.value)} type={type} value={inputValue}/>
                        <span className={inputValue ? 'animatedPlaceholder animated' : 'animatedPlaceholder'}>{placeholder}</span>
                    </div>
                )
            case 'textarea':
                return (
                    <div className='custom_textarea'>
                        <textarea onChange={(e) => onInput(e.target.value)}
                                  required={true}
                                  value={inputValue}
                                  placeholder={placeholder}
                        />
                    </div>
                )
            case 'radio':
                return (
                    <div className='custom_radio'>
                        <input type="radio"
                               className="custom-radio"
                               name={name}
                               id={radioValue}
                               checked={isRadioChecked}
                               onChange={handleChange}
                        />
                        <label htmlFor={radioValue}>
                            <span>{label}</span>
                        </label>
                    </div>
                )
        }
    }


};

export default CustomInput;
