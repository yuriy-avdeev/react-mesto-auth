import logo from '../images/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ userEmail, loggedIn, handleClickOut, handleLogoClick }) {

    const location = useLocation(); // или > { pathname } = useLocation();
    const [showLink, setShowLink] = React.useState('')

    React.useEffect(() => {
        location.pathname === '/sign-in' ? setShowLink('Регистрация') : setShowLink('Войти');
    }, [location]);

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" onClick={handleLogoClick} />
            {
                loggedIn ?
                    (
                        <div className="header__container-auth">
                            <p className="header__email">{userEmail}</p>
                            <button className="header__button-out" onClick={handleClickOut}>Выйти</button>
                        </div>
                    )
                    :
                    (
                        <Link
                            className="header__button-auth"
                            to={showLink === "Регистрация" ? "/sign-up" : "/sign-in"}
                        >
                            {showLink}
                        </Link>
                    )
            }
        </header>
    );
}

export default Header;