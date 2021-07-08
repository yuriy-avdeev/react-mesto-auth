import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUser } from '../contexts/CurrentUserContext';

function App() {

    const [currentUser, setCurrentUser] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then(userData => {
                setCurrentUser(userData);
            })
            .catch(err =>console.log(err))
    }, []);

    React.useEffect(() => {
        api.getCards()
            .then(dataCardList => {
                // dataCardList = dataCardList.slice(0, 6);  // <=
                setCards(dataCardList);
            })
            .catch(err =>console.log(err))
    }, []);

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard();
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
            .catch(err =>console.log(err))
    }

    const handleCardDelete = (clickedCard) => {
        api.deleteCard(clickedCard._id)
            .then(() => {
                setCards(cards.filter(card => card._id !== clickedCard._id));
            })
            .catch(err =>console.log(err))
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
            .catch(err =>console.log(err))
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
            .catch(err =>console.log(err))
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
            .catch(err =>console.log(err))
    }

    // увеличенная фотография
    const [selectedCard, setSelectedCard] = React.useState();

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    return (
        <CurrentUser.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

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
                <Footer />
            </div>
        </CurrentUser.Provider>
    );
}

export default App;