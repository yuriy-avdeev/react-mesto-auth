import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUser } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUser);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // после загрузки установить в форме имя и проф-ю
    React.useEffect(() => {
        if (currentUser) {                                          
        setName(currentUser.name);
        setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    const handleNameInput = (evt) => {
        setName(evt.target.value);
    }

    const handleDescriptionInput = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onUpdateUser({ name, about: description });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='editProfile'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
        >
            <input
                id="username-input"
                name="name"
                value={name}
                type="text"
                className="popup__input popup__input_type_name"
                placeholder="Имя пользователя"
                minLength="2"
                maxLength="40"
                onChange={handleNameInput}
                required
            />
            <span className="username-input-error popup__input-error"></span>
            <input
                id="useractivity-input"
                name="activity"
                value={description}
                type="text"
                className="popup__input popup__input_type_activity"
                placeholder="Профессия"
                minLength="2"
                maxLength="200"
                onChange={handleDescriptionInput}
                required
            />
            <span className="useractivity-input-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;