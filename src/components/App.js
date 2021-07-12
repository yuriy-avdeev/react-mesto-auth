import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUser } from '../contexts/CurrentUserContext';

function App() {

    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState();
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [validQuery, setValidQuery] = React.useState(false);
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [clickSubmit, setClickSubmit] = React.useState(false);
    const [showRegistration, setShowRegistration] = React.useState(true)

    // проверка токена и отрисовка (при изме пути (history) или стейта (loggedIn))
    React.useEffect(() => {
        if (localStorage.token) {
            auth.checkToken()
                .then(data => {
                    setLoggedIn(true);
                    setUserEmail(data.data.email);
                    moveToMain();
                })
                .catch(err => console.log(err))
        }
    }, [history, loggedIn]);

    React.useEffect(() => {
        api.getUserInfo()
            .then(userData => {
                setCurrentUser(userData);
            })
            .catch(err => console.log(err))
    }, []);

    React.useEffect(() => {
        api.getCards()
            .then(dataCardList => {
                dataCardList = dataCardList.slice(0, 6);  // <=
                setCards(dataCardList);
            })
            .catch(err => console.log(err))
    }, []);

    // авторизация при сабмите
    const onLogin = ({ password, email }) => {
        setClickSubmit(true);
        auth.comeIn({ password, email })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setLoggedIn(true);
                    setClickSubmit(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setValidQuery(false);
                setInfoTooltipOpen(true);
                setClickSubmit(false);
            })
    }

    // клик на 'Выход' - удаление токена
    const onSignOut = () => {
        loggedIn && localStorage.removeItem('token');
        moveToAuth();
        setLoggedIn(false);
    }

    // регистрация при сабмите
    const onRegister = ({ password, email }) => {
        setClickSubmit(true);
        auth.checkIn({ password, email })
            .then((data) => {
                if (data) {
                    setValidQuery(true);
                    setValidQuery && setInfoTooltipOpen(true);
                    setTimeout(moveToAuth, 1500);
                    setClickSubmit(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setValidQuery(false);
                setInfoTooltipOpen(true);
                setClickSubmit(false);
            })
    }

    // пути
    const moveToMain = () => {
        if (loggedIn) {
            history.push('/');
        } else {
            moveToAuth();
        }
    }

    const moveToAuth = () => {
        history.push('/sign-in');
        setShowRegistration(true);
        if (setInfoTooltipOpen) {
            setInfoTooltipOpen(false);
            !setInfoTooltipOpen && setValidQuery(false);
        }
    }

    const moveToRegistration = () => {
        history.push('/sign-up');
        setShowRegistration(false);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard();
        setInfoTooltipOpen(false);
    }

    const handleCardLike = (clickedCard) => {
        const isLikedCard = clickedCard.likes.some(someLike => someLike._id === currentUser._id);
        api.changeLikeCardStatus(clickedCard._id, isLikedCard)
            .then((returnedCard) => {
                setCards(
                    cards.map(card =>
                        card._id === returnedCard._id ? returnedCard : card
                    )
                );
            })
            .catch(err => console.log(err))
    }

    const handleCardDelete = (clickedCard) => {
        api.deleteCard(clickedCard._id)
            .then(() => {
                setCards(cards.filter(card => card._id !== clickedCard._id));
            })
            .catch(err => console.log(err))
    }

    // обновление данных польз-ля
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    const handleUpdateUser = (enteredUserData) => {
        api.setUserInfo(enteredUserData)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    // добавление новой карточки 
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    const handleAddPlaceSubmit = (cardData) => {
        api.saveNewCard(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    // изменение аватарки
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    const handleUpdateAvatar = (enteredUrl) => {
        api.setNewAvatar(enteredUrl)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    // увеличенная фотография
    const [selectedCard, setSelectedCard] = React.useState();

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    return (
        <CurrentUser.Provider value={currentUser}>
            <div className="page">
                <Header
                    userEmail={userEmail}
                    loggedIn={loggedIn}
                    handleClickOut={onSignOut}
                    handleLogoClick={moveToMain}
                    showRegistration={showRegistration}
                    moveToRegistration={moveToRegistration}
                    moveToAuth={moveToAuth}
                />

                <Switch>
                    <Route exact path="/sign-in">
                        <Login
                            handleLoginSubmit={onLogin}
                            clickSubmit={clickSubmit}
                        />
                    </Route>

                    <Route exact path="/sign-up">
                        <Register
                            handleRegistrationSubmit={onRegister}
                            handleComeIn={moveToAuth}
                            clickSubmit={clickSubmit}
                        />
                    </Route>

                    <ProtectedRoute
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditProfile={handleEditProfileClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                </Switch>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={infoTooltipOpen}
                    onClose={closeAllPopups}
                    validQuery={validQuery}
                />

                <Footer />
            </div>
        </CurrentUser.Provider>
    );
}

export default App;