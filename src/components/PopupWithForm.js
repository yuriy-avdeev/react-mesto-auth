import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, buttonText, children }) {

    const handleFieldClick = (evt) => {
        evt.target === evt.currentTarget && onClose()
        // console.log(children)
    }

    React.useEffect(() => {
        const handleEsc = (evt) => {
            evt.key === 'Escape' && onClose()
        }

        isOpen && document.addEventListener('keyup', handleEsc);

        return () => {
            document.removeEventListener('keyup', handleEsc);
        };
    }, [isOpen]);

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_active'}`} onClick={handleFieldClick}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={`popup-form_type_${name}`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__submit" type="submit">{buttonText}</button>
                </form>
                <button className="popup__close" type="button" aria-label="закрыть форму" onClick={onClose}>
                </button>
            </div>
        </div>
    )
}

export default PopupWithForm;