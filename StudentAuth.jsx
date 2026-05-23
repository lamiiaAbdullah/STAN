
import React, { useState } from 'react';
import { dbService } from '../services/db.js';

const StudentAuth = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true); // Default to Login mode

    // Login State
    const [loginData, setLoginData] = useState({ universityId: '', name: '' });

    // Register State
    const [registerData, setRegisterData] = useState({
        name: '',
        universityId: '',
        major: '',
        gpa: '',
        skills: '',
        portfolio: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handlers
    const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!loginData.universityId || !loginData.name) throw new Error("Please enter User Name and ID");

            const user = await dbService.loginStudent(loginData.universityId);

            // Relaxed name check for demo
            if (!user.name.toLowerCase().includes(loginData.name.toLowerCase())) throw new Error("User Name does not match the ID.");

            // Login success
            setTimeout(() => onLoginSuccess(user), 500);

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
            if (!registerData.name || !registerData.universityId || !registerData.major || !registerData.gpa || !registerData.skills) {
                throw new Error("All fields are required except Portfolio");
            }

            const skillsArray = registerData.skills.split('،').map(s => s.trim()).filter(s => s !== '');
            const skillsArrayEng = skillsArray.length === 1 ? skillsArray[0].split(',').map(s => s.trim()) : skillsArray;

            const studentData = {
                ...registerData,
                gpa: parseFloat(registerData.gpa),
                skills: skillsArrayEng.length > 0 ? skillsArrayEng : [registerData.skills],
            };

            const user = await dbService.registerStudent(studentData);
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
                    {isLogin ? 'Student Login' : 'New Student Registration'}
                </h2>

                {error && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                {isLogin ? (
                    // --- LOGIN FORM ---
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>User Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={loginData.name}
                                onChange={handleLoginChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>University ID</label>
                            <input
                                type="text"
                                name="universityId"
                                className="form-input"
                                value={loginData.universityId}
                                onChange={handleLoginChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    // --- REGISTER FORM ---
                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>University ID</label>
                            <input
                                type="text"
                                name="universityId"
                                className="form-input"
                                value={registerData.universityId}
                                onChange={handleRegisterChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Major</label>
                            <select name="major" className="form-input" value={registerData.major} onChange={handleRegisterChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                                <option value="">Select Major</option>
                                <option value="علوم حاسب">Computer Science</option>
                                <option value="هندسة برمجيات">Software Engineering</option>
                                <option value="نظم معلومات">Information Systems</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>GPA</label>
                            <input
                                type="number"
                                step="0.01"
                                name="gpa"
                                className="form-input"
                                value={registerData.gpa}
                                onChange={handleRegisterChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', direction: 'ltr' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                className="form-input"
                                value={registerData.skills}
                                onChange={handleRegisterChange}
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

export default StudentAuth;
