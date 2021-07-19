import logo from '../images/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import closeIcon from '../images/close_icon.svg'

function Header({ userEmail, loggedIn, handleClickOut, handleLogoClick }) {

    const location = useLocation(); // или > { pathname } = useLocation();
    const [showLink, setShowLink] = React.useState('')
    const [showEmail, setShowEmail] = React.useState(false);
    const handleClickUnwrap = () => {
        setShowEmail(!showEmail);
    }

    React.useEffect(() => {
        loggedIn && setShowEmail(true);
    }, [loggedIn]);

    React.useEffect(() => {
        location.pathname === '/sign-in' ? setShowLink('Регистрация') : setShowLink('Войти');
    }, [location]);

    return (
        <header className="header">

            <img className="header__logo" src={logo} alt="логотип" onClick={handleLogoClick} />
            {
                loggedIn ?
                    (<>
                        {/* кнопка - меняет состояние показа контейнера ниже */}
                        <button className={'header__button-unwrap'} type="button" aria-label="развернуть" onClick={handleClickUnwrap}>
                            {showEmail ?
                                <img className="header__button-unwrap" src={closeIcon} alt="крестик" />
                                :
                                <>
                                    <span className="header__line" />
                                    <span className="header__line" />
                                    <span className="header__line" />
                                </>
                            }
                        </button>

                        {/* контейнер с е-маил и 'Выйти' */}
                        <div className={`header__container-auth ${!showEmail && 'header__container-auth_hidden'}`}>
                            <p className="header__email">{userEmail}</p>
                            <button className="header__button-out" onClick={handleClickOut}>Выйти</button>
                        </div>
                    </>)
                    :
                    (<Link className="header__button-auth" to={showLink === "Регистрация" ? "/sign-up" : "/sign-in"}>
                        {showLink}
                    </Link>)
            }

        </header>
    );
}

export default Header;