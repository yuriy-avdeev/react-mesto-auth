import React from 'react';
import { CurrentUser } from '../contexts/CurrentUserContext';

const Card = React.memo(({ onCardClick, card, onCardLike, onCardDelete }) => {

    const currentUser = React.useContext(CurrentUser);
    const isOwnCard = card.owner._id === currentUser._id;
    const isLikedCard = card.likes.some(someLike =>
        someLike._id === currentUser._id);
    // консты для именения рендера корзины и лайка (в className): - v
    const cardDeleteButtonClassName = (`card__basket ${!isOwnCard && 'card__basket_hidden'}`);
    const cardLikeButtonClassName = (`card__like ${isLikedCard && 'card__like_click'}`);

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return (
        <div className="card">

            <div
                className="card__image"
                onClick={handleClick}
                style={{ backgroundImage: `url(${card.link})` }}>
            </div>
            <h2 className="card__caption">{card.name}</h2>

            <div className="card__like-area">
                <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="поставим лайк"
                    onClick={handleLikeClick}
                >
                </button>
                <p className="card__like-number" value="like-number">{card.likes.length}</p>
            </div>

            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="удаляем фотографию"
                onClick={handleDeleteClick}
            >
            </button>
        </div>
    );
});

export default Card;