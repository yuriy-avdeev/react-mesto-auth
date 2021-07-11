import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PronectedRoute({ component: Component, ...props }) {
    return (
        <Route>
            {props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
        </Route>
    );
};

export default PronectedRoute;