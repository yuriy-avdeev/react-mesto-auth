import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Main, ...props }) {
    return (
        <Route>
            {props.loggedIn ? <Main {...props} /> : <Redirect to="/react-mesto-auth/sign-in" />}
        </Route>
    );
};

export default ProtectedRoute;