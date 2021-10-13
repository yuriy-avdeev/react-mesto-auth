import logo from '../images/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import closeIcon from '../images/close_icon.svg'

function Header({ userEmail, loggedIn, handleClickOut }) {

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
        location.pathname === '/react-mesto-auth/sign-in' ? setShowLink('Регистрация') : setShowLink('Войти');
    }, [location]);

    return (
        <header className="header">
            <Link to="/react-mesto-auth/sign-up">
                <img className="header__logo" src={logo} alt="логотип" />
            </Link>
            {
                loggedIn ?
                    (<>
                        {/* кнопка - меняет состояние показа контейнера ниже */}
                        <button className={'header__button-unwrap'} aria-label="развернуть" onClick={handleClickUnwrap}>
                            {showEmail ?
                                <img className="header__button-unwrap" src={closeIcon} alt="крестик" />
                                :
                                <div className="header__line">☰</div>
                            }
                        </button>

                        {/* контейнер с е-маил и 'Выйти' */}
                        <div className={`header__container-auth ${!showEmail && 'header__container-auth_hidden'}`}>
                            <p className="header__email">{userEmail}</p>
                            <button className="header__button-out" type="button" onClick={handleClickOut}>Выйти</button>
                        </div>
                    </>)
                    :
                    (<Link className="header__button-auth" to={showLink === "Регистрация" ? "/react-mesto-auth/sign-up" : "/react-mesto-auth/sign-in"}>
                        {showLink}
                    </Link>)
            }

        </header>
    );
}

export default Header;