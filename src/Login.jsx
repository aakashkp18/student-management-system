import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
	const navigate = useNavigate()
	const [form, setForm] = useState({ email: '', password: '' })
	const [error, setError] = useState('')

	const updateField = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
		setError('')
	}

	const submitForm = (event) => {
		event.preventDefault()
		if (!form.email.trim() || !form.password) {
			setError('Enter your email and password to continue.')
			return
		}
		navigate('/dashboard')
	}

	return (
		<main className="login-page">
			<section className="login-panel">
				<div className="login-brand"><span className="brand-mark">S</span><span>Campus<span className="brand-accent">Track</span></span></div>
				<div className="login-heading">
					<p className="eyebrow">Student administration</p>
					<h1>Welcome back</h1>
					<p className="subheading">Sign in to manage your student directory</p>
				</div>
				<form className="login-form" onSubmit={submitForm}>
					<label>Email address<input type="email" name="email" value={form.email} onChange={updateField} placeholder="admin@campustrack.com" autoComplete="email" /></label>
					<label>Password<input type="password" name="password" value={form.password} onChange={updateField} placeholder="Enter your password" autoComplete="current-password" /></label>
					{error && <p className="form-error">{error}</p>}
					<button className="primary-button login-button" type="submit">Sign in</button>
				</form>
				<p className="login-note">Use your administrator account to continue</p>
			</section>
			<aside className="login-aside"><span className="aside-kicker">CampusTrack </span><h2>Every student record in one clear place</h2><p>Keep your campus directory organized, current and easy to access</p></aside>
		</main>
	)
}

export default Login
