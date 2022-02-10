import React, { useState } from 'react';
import { BiChevronRight, BiChevronDown } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function SingleMenu({ link, setIsMobileSidebarOpen }) {
    const [isDropdown, setIsDropdown] = useState(false);

    let navigate = useNavigate();

    const handleClick = () => {
        if (link.dropdown) {
            setIsDropdown(!isDropdown);
        } else {
            navigate(link.to);
            setIsMobileSidebarOpen(false);
        }
    };

    return (
        <li className='singleMenu'>
            <button className='singleMenu__btn' onClick={handleClick}>
                {link.name}{' '}
                <span>
                    {link.dropdown && isDropdown ? (
                        <BiChevronDown />
                    ) : (
                        link.dropdown && <BiChevronRight />
                    )}
                </span>
            </button>
            {link.dropdown && (
                <ul
                    className={
                        isDropdown
                            ? 'singleMenu__dropdown singleMenu__dropdown__active'
                            : 'singleMenu__dropdown'
                    }
                >
                    {link.dropdown.map((dropLink, index) => {
                        return (
                            <li
                                key={index}
                                className='singleMenu__dropdown__item'
                            >
                                <button
                                    onClick={() => {
                                        navigate(dropLink.to);
                                        setIsMobileSidebarOpen(false);
                                    }}
                                >
                                    {dropLink.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

export default SingleMenu;
