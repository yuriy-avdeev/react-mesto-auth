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
import PopupWithConfirm from './PopupWithConfirm'
import api from '../utils/api';
import { register, authorize, checkToken } from '../utils/auth';
import { CurrentUser } from '../contexts/CurrentUserContext';
import UnionV from '../images/union-v.svg';
import UnionX from '../images/union-x.svg';

function App() {

    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState();
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isAuthSuccess, setIsAuthSuccess] = React.useState(false);
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');

    // проверка токена
    React.useEffect(() => {
        if (localStorage.token) {
            checkToken(localStorage.token)
                .then((res) => {
                    setLoggedIn(true);
                    setUserEmail(res.data.email);
                    moveToMain();
                })
                .catch(err => console.log(`Ошибка ${err}`))
        }
    }, []);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([userData, dataCardList]) => {

                setCurrentUser(userData);

                dataCardList = dataCardList.slice(0, 6);  // <<<===
                setCards(dataCardList);
            })
            .catch(err => console.log(err))
    }, []);

    // авторизация при сабмите
    const onLogin = ({ password, email }) => {
        setIsSubmitting(true);
        authorize({ password, email })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setUserEmail(email);
                    setLoggedIn(true);
                    moveToMain();
                }
            })
            .catch((err) => {
                console.log(err);
                setIsAuthSuccess(false);
                setInfoTooltipOpen(true);
            })
            .finally(() => setIsSubmitting(false))
    }

    // клик на 'Выход' - удаление токена
    const onSignOut = () => {
        localStorage.removeItem('token');
        setUserEmail('');
        moveToAuth();
        setLoggedIn(false);
    }

    // регистрация при сабмите
    const onRegister = ({ password, email }) => {
        setIsSubmitting(true);
        register({ password, email })
            .then(() => {
                setIsAuthSuccess(true);
                setTimeout(moveToAuth, 2000);
                setTimeout(() => setInfoTooltipOpen(false), 2100);
            })
            .catch((err) => {
                console.log(err);
                setInfoTooltipOpen(true);
                setIsAuthSuccess(false);
            })
            .finally(() => {
                setIsSubmitting(false)
                setInfoTooltipOpen(true);
            })
    }

    // пути
    const moveToMain = () => {
        history.push('/react-mesto-auth');
    }

    const moveToAuth = () => {
        history.push('/react-mesto-auth/sign-in');
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsPopupWithDeleteCardConfirmOpen(false);
        setSelectedCard();
        setInfoTooltipOpen(false);
    }

    const handleCardLike = (clickedCard) => {
        const isLikedCard = clickedCard.likes.some(someLike => someLike._id === currentUser._id);
        api.changeLikeCardStatus(clickedCard._id, isLikedCard)
            .then((returnedCard) => {
                setCards((cards) =>
                    cards.map(card =>
                        card._id === returnedCard._id ? returnedCard : card
                    )
                );
            })
            .catch(err => console.log(err))
    }

    // обновление данных польз-ля
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleUpdateUser = (enteredUserData) => {
        setIsSubmitting(true);
        api.setUserInfo(enteredUserData)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))
    }

    // добавление новой карточки 
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleAddPlaceSubmit = (cardData) => {
        setIsSubmitting(true);
        api.saveNewCard(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))
    }

    // изменение аватарки
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleUpdateAvatar = (enteredUrl) => {
        setIsSubmitting(true)
        api.setNewAvatar(enteredUrl)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))
    }

    //  удаление карточки
    const [isPopupWithDeleteCardConfirmOpen, setIsPopupWithDeleteCardConfirmOpen] = React.useState(false);
    const [removableCard, setRemovableCard] = React.useState(null)

    // из Card.js
    const handleCardDelete = (clickedCard) => {
        setIsPopupWithDeleteCardConfirmOpen(true);
        setRemovableCard(clickedCard);
    }

    // из PopupWithConfirm.js
    const handleClickConfirmButton = (evt) => {
        evt.preventDefault();
        deleteCard();
    }

    const deleteCard = () => {
        setIsSubmitting(true);
        api.deleteCard(removableCard._id)
            .then(() => {
                setCards(
                    cards.filter(card =>
                        card._id !== removableCard._id));
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setRemovableCard('')
                setIsSubmitting(false)
            })
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
                />

                <Switch>
                    <Route exact path="/react-mesto-auth/sign-in">
                        <Login
                            handleLoginSubmit={onLogin}
                            isSubmitting={isSubmitting}
                        />
                    </Route>

                    <Route exact path="/react-mesto-auth/sign-up">
                        <Register
                            handleRegistrationSubmit={onRegister}
                            isSubmitting={isSubmitting}
                        />
                    </Route>

                    <ProtectedRoute path="/react-mesto-auth"
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
                    isSubmitting={isSubmitting}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isSubmitting={isSubmitting}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isSubmitting={isSubmitting}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <PopupWithConfirm
                    isOpen={isPopupWithDeleteCardConfirmOpen}
                    onClose={closeAllPopups}
                    handleClickConfirmButton={handleClickConfirmButton}
                    isSubmitting={isSubmitting}
                />

                <InfoTooltip
                    isOpen={infoTooltipOpen}
                    onClose={closeAllPopups}
                    isAuthSuccess={isAuthSuccess}
                    icon=
                    {
                        isAuthSuccess ?
                            UnionV : UnionX
                    }

                    notification=
                    {
                        isAuthSuccess ?
                            'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
                    }
                />

                <Footer />
            </div>
        </CurrentUser.Provider>
    );
}

export default App;