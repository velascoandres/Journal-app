import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/userForm';

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

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Do dispatch
		const loginAction = startLoginEmailPassword(email, password);
		dispatch(loginAction);
	};

	const handleGoogleLogin = () => {
		console.log('AQUI');
		dispatch(startGoogleLogin());
	};

	return (
		<>
			<h3 className="auth__title" >Login Screen</h3>
			<form onSubmit={handleLogin}>
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
