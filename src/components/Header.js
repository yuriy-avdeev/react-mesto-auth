import logo from '../images/logo.svg';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Header({ userEmail, loggedIn }) {

    const history = useHistory();

    const handleClick = () => {
        loggedIn && localStorage.removeItem('token')
        history.push('/sign-in')
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <div className="header__container-auth">
                {
                    userEmail
                        ?
                        <p className="header__email">{userEmail}</p>
                        :
                        ''
                }
                <p
                    className="header__button-auth"
                    onClick={handleClick}
                    >
                    {loggedIn ? 'Выйти' : 'Войти'}
                </p>
            </div>
        </header >
    );

}

export default Header;