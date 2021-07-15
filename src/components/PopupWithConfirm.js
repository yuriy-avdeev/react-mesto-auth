import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirm({ isOpen, onClose, handleClickConfirmButton, isSubmitting }) {

    return (
        <PopupWithForm
            title='Вы уверены?'
            name='confirmDelete'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleClickConfirmButton}
            buttonText={isSubmitting ? 'Удаляем...' : 'Да'}
        />
    )
}

export default PopupWithConfirm;