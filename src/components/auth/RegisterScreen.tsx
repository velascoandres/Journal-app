import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';


import { useForm } from '../../hooks/userForm';
import { AuthState } from '../../reducers/authReducer';
import { UIState } from '../../reducers/uiReducer';


type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    password2: string;
};


const initialRegisterForm: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
};


export const RegisterScreen: React.FC = () => {

    const [formValues, handleInput] = useForm<RegisterFormValues>(initialRegisterForm)
    const { email, name, password, password2 } = formValues;

    const dispatch = useDispatch();

    const { msgError, loading } = useSelector<{ ui: UIState, auth: AuthState }, UIState>(
        ({ ui }) => ui,
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
           dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    };


    const isFormValid = (): boolean => {
        if (validator.isEmpty(name)) {
            dispatch(setError('El nombre es requerido'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email invalido'));
            return false;
        } else if (password !== password2 || password.length <= 5) {
            dispatch(setError('Password incorrecta'));
            return false;
        }
        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title" >Register Screen</h3>
            <form
                onSubmit={handleSubmit}
            >
                {
                    msgError &&

                    <div className="auth__alert auth__alert__error">
                        {msgError}
                    </div>

                }

                <input
                    type="text"
                    placeholder="Name"
                    className="auth__input"
                    name="name"
                    onChange={handleInput}
                    autoComplete="off"
                />

                <input
                    type="text"
                    placeholder="Email"
                    className="auth__input"
                    onChange={handleInput}
                    name="email"
                    autoComplete="off"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="auth__input"
                    onChange={handleInput}
                    name="password"
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="auth__input"
                    onChange={handleInput}
                    name="password2"
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                    disabled={loading}
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