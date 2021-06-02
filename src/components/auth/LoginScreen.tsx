import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/userForm';
import { removeError, setError } from '../../actions/ui';
import { UIState } from '../../reducers/uiReducer';
import { AuthState } from '../../reducers/authReducer';

type LoginFormValues = {
	email: string;
	password: string;
}


export const LoginScreen: React.FC = () => {

	const dispatch = useDispatch();

	const initialForm: LoginFormValues = {
		email: '',
		password: '',
	};

	const [formValues, handleInputChange] = useForm<LoginFormValues>(initialForm);

	const { email, password } = formValues;

	const { msgError, loading } = useSelector<{ ui: UIState, auth: AuthState }, UIState>(
		({ ui }) => ui,
	);

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Do dispatch
		if (isFormValid()) {
			const loginAction = startLoginEmailPassword(email, password);
			dispatch(loginAction);
		}
	};

	const handleGoogleLogin = () => {
		dispatch(startGoogleLogin());
	};


	const isFormValid = (): boolean => {
		if (!validator.isEmail(email)) {
			dispatch(setError('Email invalido'));
			return false;
		} else if (validator.isEmpty(password)) {
			dispatch(setError('Password incorrecta'));
			return false;
		}
		dispatch(removeError());
		return true;
	}

	return (
		<>
			<h3 className="auth__title" >Login Screen</h3>

			{
				msgError &&

				<div className="auth__alert auth__alert__error">
					{msgError}
				</div>

			}

			<form 
				onSubmit={handleLogin}
				className="animate__animated animate__fadeIn animate__faster"
			>
				<input
					type="text"
					placeholder="email"
					className="auth__input"
					name="email"
					value={email}
					onChange={handleInputChange}
					autoComplete="off"
				/>
				<input
					type="password"
					placeholder="Password"
					className="auth__input"
					value={password}
					name="password"
					onChange={handleInputChange}
				/>

				<button
					className="btn btn-primary btn-block"
					type="submit"
					disabled={loading}
				>
					Login
				</button>

				<hr />

				<div className="auth__social-networks">
					<p>Login with social networks</p>

					<div
						className="google-btn"
						onClick={handleGoogleLogin}
					>
						<div className="google-icon-wrapper">
							<img
								className="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="google button"
							/>
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>

					</div>
				</div>


				<Link
					to="/auth/register"
					className="link"
				>
					Create new account
				</Link>
			</form>
		</>
	);
};
