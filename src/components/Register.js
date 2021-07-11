import React from 'react';

function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleRegistrationSubmit({ password, email });
        setEmail('');
        setPassword('');
    }

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handleChangePassword = (evt) => {
        setPassword(evt.target.value);
    }

    return (
        <div className="access">
            <h2 className="access__titile">Регистрация</h2>
            <form className="access__form" onSubmit={handleSubmit}>
                <input
                    name="email"
                    className="access__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}
                    required
                />
                <input
                    name="password"
                    className="access__input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    minLength="5"
                    maxLength="25"
                    onChange={handleChangePassword}
                    required
                />
                <button type="submit" className="access__submit">Зарегистрироваться</button>
            </form>
            <p className="access__isRegistrated">Уже зарегистрированы?
                <span className="access__welcome">Войти</span>
            </p>
        </div>
    );
}

export default Register;