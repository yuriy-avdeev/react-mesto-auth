import React from 'react';
import { CurrentUser } from '../contexts/CurrentUserContext';

const Card = React.memo((props) => {

    const currentUser = React.useContext(CurrentUser);
    const isOwnCard = props.card.owner._id === currentUser._id;
    const isLikedCard = props.card.likes.some(someLike => someLike._id === currentUser._id);
    // консты для именения рендера корзины и лайка (в className): -v
    const cardDeleteButtonClassName = (`card__basket ${!isOwnCard && 'card__basket_hidden'}`);
    const cardLikeButtonClassName = (`card__like ${isLikedCard && 'card__like_click'}`);

    const handleClick = () => {
        props.onCardClick(props.card);
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card);
    }

    const handleDeleteClick = () => {
        props.onCardDelete(props.card);
    }

    return (
        <div className="card">

            <div
                className="card__image"
                onClick={handleClick}
                style={{
                    backgroundImage: `url(${props.card.link})`,
                    backgroundSize: 'cover',
                }}>
            </div>
            <h2 className="card__caption">{props.card.name}</h2>

            <div className="card__like-area">
                <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="поставим лайк"
                    onClick={handleLikeClick}
                >
                </button>
                <p className="card__like-number" value="like-number">{props.card.likes.length}</p>
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