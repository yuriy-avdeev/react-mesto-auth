import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSubmitting }) {

    const newAvatarRef = React.useRef();

    React.useEffect(() => {
        if (!isOpen) {
            newAvatarRef.current.value=''
        }
    }, [isOpen]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        newAvatarRef.current.value && onUpdateAvatar(newAvatarRef.current.value);
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='editAvatar'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={isSubmitting ? 'Сохраняем...' : 'Сохранить'}
        >
            <input
                id="url-avatar-input"
                name="link"
                type="url"
                className="popup__input popup__input_new-avatar"
                ref={newAvatarRef}
                placeholder="Ссылка на изображение"
                required
            />
            <span className="url-avatar-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;