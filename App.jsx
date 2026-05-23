
import React, { useState, useEffect } from 'react';
import { dbService } from './services/db.js';
import StudentAuth from './components/StudentAuth.jsx';
import FacultyPortal from './components/FacultyPortal.jsx';
import FacultyAuth from './components/FacultyAuth.jsx';


import InterviewCard from './components/intervewCard.jsx';

import PlatformsGrid from './components/platformGride.jsx';


// --- Matching Logic ---
const calculateMatch = (student, job) => {
  let score = 0;
  const jobSkills = job.requiredSkills.map(s => s.toLowerCase());
  const studentSkills = (student.skills || []).map(s => s.toLowerCase());

  // 1. Major (30%)
  const majorKeywords = student.major ? student.major.split(' ') : [];
  const jobText = (job.title + ' ' + job.description).toLowerCase();
  let majorMatch = false;
  majorKeywords.forEach(kw => {
    if (kw.length > 2 && jobText.includes(kw)) majorMatch = true;
  });
  if (majorMatch) score += 30;

  // 2. Skills (40%)
  if (jobSkills.length > 0) {
    const matchedSkills = jobSkills.filter(js =>
      studentSkills.some(ss => ss.includes(js) || js.includes(ss))
    );
    const skillRatio = matchedSkills.length / jobSkills.length;
    score += (skillRatio * 40);
  }

  // 3. GPA (15%)
  if (student.gpa >= job.minGpa) score += 15;

  // 4. Location (15%)
  if (job.type === 'عن بعد' || (student.location && job.location.includes(student.location))) {
    score += 15;
  }

  if (score < 20 && majorMatch) score = 40;

  return Math.min(Math.round(score), 100);
};

// --- Edit Profile Modal ---
const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    gpa: user.gpa || '',
    skills: (user.skills || []).join(', '),
    portfolio: user.portfolio || '',
    major: user.major || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');

    const updatedData = {
      ...formData,
      gpa: parseFloat(formData.gpa),
      skills: skillsArray
    };

    onSave(updatedData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content card" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Edit Profile</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Major</label>
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Major...</option>
              <option value="علوم حاسب">Computer Science</option>
              <option value="هندسة برمجيات">Software Engineering</option>
              <option value="نظم معلومات">Information Systems</option>
              <option value="أمن سيبراني">Cybersecurity</option>
              <option value="تقنية معلومات">Information Technology</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>GPA</label>
            <input
              type="number"
              step="0.01"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="form-input"
              style={{ direction: 'ltr' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Portfolio Link</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="form-input"
              style={{ direction: 'ltr' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Job Card ---
const JobCard = ({ job, matchScore }) => (
  <div className="card animate-fade-in">
    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
      <img
        src={job.company?.logo || 'https://via.placeholder.com/60'}
        alt={job.company?.name}
        className="company-logo-placeholder"
      />
      <div style={{ flex: 1 }}>
        <div className="job-card-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '0.25rem', fontWeight: '700' }}>{job.title}</h3>
            <div style={{ color: '#6b7280', fontSize: '0.95rem', fontWeight: '500' }}>{job.company?.name}</div>
          </div>
          {matchScore > 0 && (
            <div className={`badge ${matchScore >= 80 ? 'badge-green' : matchScore >= 60 ? 'badge-blue' : 'badge-gray'}`} style={{ fontSize: '0.9rem' }}>
              {matchScore}% Match
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {job.location}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>💼 {job.type}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📊 GPA: {job.minGpa}+</span>
        </div>

        <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.7', marginBottom: '1.25rem' }}>
          {job.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid #f3f4f6', paddingTop: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {job.requiredSkills.slice(0, 4).map(skill => (
              <span key={skill} className="badge badge-gray" style={{ fontWeight: '500', fontSize: '0.75rem' }}>{skill}</span>
            ))}
            {job.requiredSkills.length > 4 && (
              <span className="badge badge-gray" style={{ fontWeight: '500', fontSize: '0.75rem' }}>+{job.requiredSkills.length - 4}</span>
            )}
          </div>
 <a
            href={job.externalUrl || "#"}
           target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none', fontSize: '0.9rem' }}
          >
            Apply Now →
          </a>
        </div>
      </div>
    </div>
  </div>
);

// --- Navbar ---
const Navbar = ({ user, role, onLogout }) => (
  <nav className="header">
    <div className="container nav-content">
      <div className="logo">🎓 Internship Portal</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'left', fontSize: '0.85rem', color: 'white' }}>
              <div style={{ fontWeight: 'bold' }}>{user.name}</div>
              <div style={{ opacity: 0.9, fontSize: '0.8rem' }}>
                {role === 'student' ? user.major || 'Student' : 'Faculty Member'}
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', border: '2px solid rgba(255,255,255,0.3)' }}>
              {user.name.charAt(0)}
            </div>
          </div>
        )}
        {user && (
          <button className="btn btn-outline" onClick={onLogout} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
            Logout
          </button>
        )}
      </div>
    </div>
  </nav>
);

// --- Student Dashboard ---
const StudentDashboard = ({ user, onUserUpdate }) => {
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const allJobs = dbService.getAllJobs();
    const jobsWithScore = allJobs.map(job => ({
      ...job,
      score: calculateMatch(user, job)
    })).sort((a, b) => b.score - a.score);

    setJobs(jobsWithScore);
  }, [user]);

  const filteredJobs = jobs.filter(job => {
    if (filterType === 'all') return true;
    if (filterType === 'highMatch') return job.score >= 30; // Lowered threshold to accommodate scraped data
    if (filterType === 'remote') return job.type.includes('عن بعد') || job.type.includes('هجين');
    return true;
  });

  const handleSaveProfile = async (updatedData) => {
    const updated = await dbService.updateStudent(user.id, updatedData);
    if (updated) {
      onUserUpdate(updated);
      setShowEditModal(false);
    }
  };

  return (
    <div className="main-layout container">
      <aside style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>
          <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>{user.name}</h3>
          <p style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '1rem' }}>{user.universityId}</p>

          <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>GPA</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{user.gpa}</div>
          </div>

          <button
            className="btn btn-outline"
            onClick={() => setShowEditModal(true)}
            style={{ width: '100%', fontSize: '0.85rem', background: 'rgba(255,255,255,0.9)', color: 'var(--primary-color)', borderColor: 'transparent' }}
          >
            ✏️ Edit Profile
          </button>
        </div>

        <div className="card">
          <div className="filter-title">Filter Opportunities</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className={`filter-option ${filterType === 'all' ? 'active' : ''}`}>
              <input type="radio" name="filter" checked={filterType === 'all'} onChange={() => setFilterType('all')} />
              <span>All Opportunities</span>
            </label>
            <label className={`filter-option ${filterType === 'highMatch' ? 'active' : ''}`}>
              <input type="radio" name="filter" checked={filterType === 'highMatch'} onChange={() => setFilterType('highMatch')} />
              <span>Best Match ✨</span>
            </label>
            <label className={`filter-option ${filterType === 'remote' ? 'active' : ''}`}>
              <input type="radio" name="filter" checked={filterType === 'remote'} onChange={() => setFilterType('remote')} />
              <span>Remote / Hybrid 🏠</span>
            </label>





          </div>

        </div>
      </aside>

      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', color: '#111827', marginBottom: '0.25rem' }}>Co-op Training Opportunities 2026</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Discover the best technical internships in Saudi Arabia</p>
          </div>
          <span className="badge badge-blue" style={{ fontSize: '0.9rem' }}>{filteredJobs.length} Opportunities</span>
        </div>

        <div className="content-grid">
          {filteredJobs.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No Results Found</h3>
              <p style={{ color: '#6b7280' }}>Try adjusting your filters to see more opportunities.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                matchScore={job.score}
              />
            ))
          )}
        </div>
      </main>

      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

// --- Role Selection ---
const RoleSelection = ({ onSelect }) => (
  <div className="auth-page">
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', background: 'linear-gradient(135deg, #004d71 0%, #006494 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', fontWeight: '800' }}>
        Saudi Internship Portal
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
        The national platform connecting university students with the best co-op training opportunities in the Kingdom, powered by intelligent matching.
      </p>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <div className="card card-gradient" onClick={() => onSelect('student')} style={{ width: '320px', cursor: 'pointer', borderTop: '4px solid var(--primary-color)', padding: '2.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>👨‍🎓</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Student Portal</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>Login and discover opportunities tailored to your profile</p>
          <div style={{ marginTop: '1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.95rem' }}>Enter Portal →</div>
        </div>

        <div className="card card-gradient" onClick={() => onSelect('faculty')} style={{ width: '320px', cursor: 'pointer', borderTop: '4px solid #f59e0b', padding: '2.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🏛️</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Faculty Portal</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>For academic supervisors and faculty members</p>
          <div style={{ marginTop: '1.5rem', color: '#f59e0b', fontWeight: 'bold', fontSize: '0.95rem' }}>Enter Portal →</div>
        </div>
      </div>

      <div style={{ marginTop: '4rem', opacity: 0.5 }}>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Trusted by leading organizations</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '600' }}> Prince Sttam Bin Abdulaziz University</div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---
function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = dbService.getCurrentUser();
    if (storedUser) {
      if (storedUser.role === 'faculty') {
        setRole('faculty');
        setUser(storedUser);
      } else {
        setRole('student');
        setUser(storedUser);
      }
    }
  }, []);

  const handleRoleSelect = (selectedRole) => {
    if (selectedRole === 'student') {
      const stored = dbService.getCurrentUser();
      if (stored && stored.role !== 'faculty') {
        setRole('student');
        setUser(stored);
      } else {
        setRole('student-auth');
      }
    } else if (selectedRole === 'faculty') {
      const stored = dbService.getCurrentUser();
      if (stored && stored.role === 'faculty') {
        setRole('faculty');
        setUser(stored);
      } else {
        setRole('faculty-auth');
      }
    }
  };

  const handleStudentLoginSuccess = (studentUser) => {
    setUser(studentUser);
    setRole('student');
  };

  const handleFacultyLoginSuccess = (facultyUser) => {
    setUser(facultyUser);
    setRole('faculty');
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    dbService.logout();
    setRole(null);
    setUser(null);
  };

  if (!role) return <RoleSelection onSelect={handleRoleSelect} />;

  if (role === 'student-auth') {
    return (
      <>
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
          <button onClick={() => setRole(null)} className="btn btn-outline">← Back</button>
  
        </div>
                    <div className="pt-32"><PlatformsGrid/> </div>
       





  
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <InterviewCard />
    </div>
  






  

        <StudentAuth onLoginSuccess={handleStudentLoginSuccess} />
      </>
    );
  

  }

  if (role === 'faculty-auth') {
    return (
      <>
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
          <button onClick={() => setRole(null)} className="btn btn-outline">← Back</button>
        </div>
        <FacultyAuth onLoginSuccess={handleFacultyLoginSuccess} />
      </>
    );
  }

  return (
    <div>
      <Navbar user={user} role={role} onLogout={handleLogout} />

      {role === 'student' && <StudentDashboard user={user} onUserUpdate={handleUserUpdate} />}
      {role === 'faculty' && <FacultyPortal user={user} />}
    </div>
  );




}









export default App;






