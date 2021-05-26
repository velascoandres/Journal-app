import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen: React.FC = () => {
    return (
        <>
            <h3 className="auth__title" >Register Screen</h3>
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    className="auth__input"
                    name="name"
                    autoComplete="off"
                />
                <input
                    type="text"
                    placeholder="Email"
                    className="auth__input"
                    name="email"
                    autoComplete="off"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="auth__input"
                    name="password"
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="auth__input"
                    name="password2"
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <hr />

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    );
};