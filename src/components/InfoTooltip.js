import React from 'react';

function InfoTooltip({ isOpen, onClose, icon, notification }) {

    const handleFieldClick = (evt) => {
        evt.target === evt.currentTarget && onClose();
    }

    React.useEffect(() => {
        const handleEsc = (evt) => {
            evt.key === 'Escape' && onClose();
        }

        isOpen && document.addEventListener('keyup', handleEsc);

        return () => {
            document.removeEventListener('keyup', handleEsc);
        };
    }, [isOpen]);

    return (
        <div className={`popup popup-access ${isOpen && 'popup_active'}`} onClick={handleFieldClick}>
            <div className="popup-access__container">
                <img className="popup-access__success" src={icon} alt={notification} />
                <p className="popup-access__notification">{notification}</p>
                <button className="popup__close" type="button" aria-label="закроем" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;