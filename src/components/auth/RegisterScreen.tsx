import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';


import { useForm } from '../../hooks/userForm';


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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {

        }
        console.log(formValues);
    };


    const isFormValid = (): boolean => {
        // TODO: implement
        if (validator.isEmpty(name)) {
            return false;
        } else if (!validator.isEmail(email)) {
            return false;
        } else if (password !== password2 || password.length <= 5) {
            return false;
        }
        return true;
    };

    return (
        <>
            <h3 className="auth__title" >Register Screen</h3>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Name"
                    className="auth__input"
                    name="name"
                    onChange={handleInput}
                    autoComplete="off"
                />

                <div className="auth__alert-error">
                    Hola mundo
                </div>

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