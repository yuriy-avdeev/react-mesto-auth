import React from 'react';
import { CurrentUser } from '../contexts/CurrentUserContext';
import editPen from '../images/edit-pen.svg'
import Card from './Card'

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUser);

    const someCard = cards.map(card => (
        <Card
            key={card._id}  // служит подсказкой для React, но не передается в компонент
            onCardClick={onCardClick}
            card={card}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
        />
    ));

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <div
                        className="profile__photo"
                        style={{
                            backgroundImage: `url(${currentUser && currentUser.avatar})`,
                            backgroundSize: 'cover'
                        }}
                    >
                    </div>
                    <img
                        className="profile__avatar-edit"
                        src={editPen}
                        alt="изображение ручки-редактора"
                        onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__information">
                    <div className="profile__person">
                        <h1 className="profile__name">{currentUser && currentUser.name}</h1>
                        <p className="profile__activity">{currentUser && currentUser.about}</p>
                    </div>
                    <button
                        className="profile__editor-popup profile__click"
                        type="button"
                        aria-label="откроем редактор профиля пользователя"
                        onClick={onEditProfile}
                    ></button>
                </div>
                <button
                    className="profile__add-place profile__click"
                    aria-label="добавим фотографию"
                    type="button"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="places">
                {someCard}
            </section>
        </main>
    );
}

export default Main;