import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '../pages/layout/auth';
import DefaultLayout from '../pages/layout/default';
export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = localStorage.getItem('id') > 0;
    if (!signed && isPrivate) {
        return <Redirect to="login" />
    }
    if (signed && !isPrivate) {
        return <Redirect to="/" />
    }
    const Layout = signed ? DefaultLayout : AuthLayout;
    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}
RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
RouteWrapper.defaultProps = {
    isPrivate: false,
};