import React, { useState } from 'react';
import { dbService } from '../services/db.js';

const FacultyAuth = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    
    // Login State
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    
    // Register State
    const [registerData, setRegisterData] = useState({
        employeeId: '',
        name: '',
        department: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!employeeId || !password) {
                throw new Error("Please enter both Employee ID and Password");
            }

            const faculty = await dbService.loginFaculty(employeeId, password);
            setTimeout(() => onLoginSuccess(faculty), 500);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!registerData.employeeId || !registerData.name || !registerData.department || !registerData.password) {
                throw new Error("All fields are required");
            }

            const user = await dbService.registerFaculty(registerData);
            setTimeout(() => onLoginSuccess(user), 800);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                    {isLogin ? 'Faculty Login' : 'Faculty Registration'}
                </h2>

                {error && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                {isLogin ? (
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Employee ID</label>
                            <input
                                type="text"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Employee ID</label>
                            <input
                                type="text"
                                name="employeeId"
                                value={registerData.employeeId}
                                onChange={handleRegisterChange}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={registerData.department}
                                onChange={handleRegisterChange}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-success" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Loading...' : 'Register'}
                        </button>
                    </form>
                )}

                <button
                    type="button"
                    style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: 'none', border: '1px solid var(--border-color)', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--primary-color)' }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Create new account' : 'Back to Login'}
                </button>
            </div>
        </div>
    );
};

export default FacultyAuth;
