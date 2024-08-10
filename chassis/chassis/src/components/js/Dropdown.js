import React, { useRef, useState } from "react"
import '../css/Dropdown.css'

// Icon component
const Icon = ({ isOpen }) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'translate' : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

function Dropdown({ options, onChange }) {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const inputRef = useRef();

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return options[0].name;
        }
        return selectedValue.name;
    };

    const onItemClick = (option) => {
        setSelectedValue(option);
        if (onChange) onChange(option);
    };

    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="dropdown" ref={inputRef} onClick={handleInputClick}>
            <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
                <div className={"dropdown-selected-value"}>{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon isOpen={showMenu} />
                    </div>
                </div>
            </div>

            {showMenu && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div onClick={() => onItemClick(option)} key={option.id} className="dropdown-item">
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown;