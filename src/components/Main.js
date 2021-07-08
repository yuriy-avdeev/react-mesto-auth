import React from 'react';
import { CurrentUser } from '../contexts/CurrentUserContext';
import editPen from '../images/edit-pen.svg'
import Card from './Card'

function Main(props) {

    const currentUser = React.useContext(CurrentUser);

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
                        onClick={props.onEditAvatar}
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
                        onClick={props.onEditProfile}
                    ></button>
                </div>
                <button
                    className="profile__add-place profile__click"
                    aria-label="добавим фотографию"
                    type="button"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="places">
                {
                    props.cards.map((card, i) => (
                        <Card
                            key={card._id}
                            onCardClick={props.onCardClick}
                            card={card}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))
                }
            </section>
        </main>
    );
}

export default Main;