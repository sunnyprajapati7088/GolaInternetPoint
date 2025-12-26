import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from './ICONS';
import { toast } from 'react-toastify';

const LoginComponent = () => {
	const { login, loginWithCredentials } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleRoleLogin = (role) => {
		try {
			const userData = login(role);
			if (userData.role === 'admin') navigate('/admin/dashboard');
			else if (userData.role === 'franchise') navigate('/franchise/dashboard');
			else navigate('/student/dashboard');
		} catch (err) {
			console.error('Login failed', err);
			toast.error('Login failed.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const userData = await loginWithCredentials(email.trim(), password);
			setLoading(false);
			if (userData) {
				toast.success(`Welcome, ${userData.name || 'User'}`);
				if (userData.role === 'admin') navigate('/admin/dashboard');
				else if (userData.role === 'franchise') navigate('/franchise/dashboard');
				else navigate('/student/dashboard');
			} else {
				toast.error('Invalid email or password');
			}
		} catch (err) {
			setLoading(false);
			console.error('Login error', err);
			toast.error('Server error — please try again');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="w-full max-w-5xl mx-4 md:mx-6 bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
				<div className="hidden md:flex flex-col items-start justify-center p-10 gap-6 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
					<div className="flex items-center gap-3">
						<div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
							<ICONS.award className="h-6 w-6 text-white" />
						</div>
						<h3 className="text-2xl font-bold">Gola Internet Point</h3>
					</div>
					<h2 className="text-3xl font-extrabold leading-tight">Fast. Local. Trusted.</h2>
					<p className="text-white/90 max-w-xs">Sign in to manage courses, students and certificates.</p>
				</div>

				<div className="flex items-center justify-center p-8 md:p-12 bg-white">
					<div className="w-full max-w-md">
						<div className="mb-6 text-center md:text-left">
							<h1 className="text-2xl md:text-3xl font-bold text-gray-900">Sign in</h1>
							<p className="mt-2 text-sm text-gray-500">Choose a role to continue</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Email</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">Password</label>
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
									placeholder="••••••••"
								/>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="w-full flex items-center justify-center gap-3 px-5 py-3 text-lg font-semibold rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition disabled:opacity-60"
							>
								<ICONS.dashboard className="h-5 w-5" />
								<span>{loading ? 'Signing in...' : 'Sign in'}</span>
							</button>
						</form>
{/* 
						<div className="mt-4 border-t pt-4 text-center">
							<p className="text-sm text-gray-500 mb-3">Or quick sign in</p>
							<div className="grid grid-cols-1 gap-3">
								<button
									onClick={() => handleRoleLogin('admin')}
									className="w-full flex items-center justify-center gap-3 px-5 py-2 text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition"
								>
									Login as Admin
								</button>

								<div className="flex gap-3">
									<button
										onClick={() => handleRoleLogin('franchise')}
										className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-orange-600 bg-white border border-orange-200 hover:shadow-sm transition"
									>
										Login as Franchise
									</button>
									<button
										onClick={() => handleRoleLogin('student')}
										className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition"
									>
										Login as Student
									</button>
								</div>
							</div>
						</div> */}

						<div className="mt-6 text-center md:text-left text-sm text-gray-500">
							<p>
								By continuing you agree to our <span className="text-orange-600 font-medium">Terms</span> and <span className="text-orange-600 font-medium">Privacy</span>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;

