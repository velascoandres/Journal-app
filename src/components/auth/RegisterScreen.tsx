import React from 'react';
import { Link } from 'react-router-dom';
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
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
    };

    const validateForm = () => {
        // TODO: implement
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