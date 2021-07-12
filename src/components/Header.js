import logo from '../images/logo.svg';
import React from 'react';

function Header({ userEmail, loggedIn, handleClickOut, handleLogoClick, showRegistration, moveToRegistration, moveToAuth }) {

    const clickLink = () => {
        if (showRegistration) {
            moveToRegistration();
        } else {
            moveToAuth();
        }
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" onClick={handleLogoClick} />
            <div className="header__container-auth">
                {
                    loggedIn ?
                        <>
                            <p className="header__email">{userEmail}</p>
                            <p className="header__button-auth" onClick={handleClickOut}>Выйти</p>
                        </>
                        :
                        <p className="header__button-auth" onClick={clickLink}>
                            {showRegistration ? 'Регистрация' : 'Войти'}
                        </p>
                }
            </div>
        </header >
    );
}

export default Header;