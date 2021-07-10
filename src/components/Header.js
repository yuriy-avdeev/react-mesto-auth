import logo from '../images/logo.svg';
import React from 'react';

function Header() {

    const loggedIn = false; // передавать  в пропс
    const [hover, setHover] = React.useState(false);

    const handleMouseHover = () => {
        setHover(!hover)
    }

    // <div className="header__container-auth" style={{ display: 'flex' }}>
    //     <p
    //         className="header__email"
    //         style={{ fontWeight: '500', fontSize: '18px', lineHeight: '1.2', margin: '0 24px 0 0' }}>
    //         email@mail.com
    //     </p>
    //     <p
    //         className="header__button-out"
    //         style={{ color: '#A9A9A9', fontWeight: 'normal', fontSize: '18px', lineHeight: '1.2', margin: '0', cursor: 'pointer' }}>
    //         Выйти
    //     </p>
    // </div>

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <p
                className="header__button-auth"
                onMouseEnter={handleMouseHover}
                onMouseLeave={handleMouseHover}
                style={!hover ?
                    { fontWeight: 'normal', fontSize: '18px', lineHeight: '1.2', margin: '0', cursor: 'pointer' }
                    :
                    { fontWeight: 'normal', fontSize: '18px', lineHeight: '1.2', margin: '0', cursor: 'pointer', opacity: '0.6' }
                }
            >
                {!loggedIn ? 'Регистрация' : 'Войти'}
            </p>
        </header >
    );

}

export default Header;