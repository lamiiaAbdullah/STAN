
import React, { useState } from 'react';
import { dbService } from '../services/db.js';

const FacultyPortal = ({ user }) => {
    const [students, setStudents] = useState(dbService.getAllStudents());
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [recommendation, setRecommendation] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

const [filterType, setFilterType] = useState('all');

    const handleAddRecommendation = () => {
        if (!recommendation.trim()) return;
    
        dbService.addRecommendation(selectedStudent.id, recommendation, user.name);
        setSuccessMsg('تم إضافة التوصية بنجاح للطالب/ة ' + selectedStudent.name);
        setRecommendation('');
        setSelectedStudent(null);

        // Refresh list
        setStudents(dbService.getAllStudents());

        setTimeout(() => setSuccessMsg(''), 3000);

const allJobs = dbService.getAllJobs();

const filteredJobs = allJobs.filter(job => {
  if (filterType === 'all') return true;
  if (filterType === 'coop') return job.type === 'Co-op';
  if (filterType === 'field') return job.type === 'Field';
  if (filterType === 'remote') return job.workMode === 'Remote';
  return true;
});
    };

    return (
        <div className="main-layout container">
            <aside className="sidebar card">
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '2px solid #fde68a' }}>
                        🏫
                    </div>
                    <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user.department}</div>
                    <div className="badge badge-gray" style={{ marginTop: '0.5rem' }}>رقم الموظف: {user.employeeId}</div>
                </div>

                <div className="filter-group">
                    <div className="filter-title">إحصائيات</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        عدد الطلاب المسجلين: <strong>{students.length}</strong>
                    </div>
                </div>
            </aside>

            <main>
                {successMsg && (
                    <div className="animate-fade-in" style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #a7f3d0' }}>
                        ✅ {successMsg}
                    </div>
                )}

                <h2 style={{ marginBottom: '1.5rem' }}>الطلاب المسجلين في المنصة</h2>

                {students.length === 0 ? (
                    <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        لا يوجد طلاب مسجلين حتى الآن.
                    </div>
                ) : (
                    <div className="content-grid">
                        {students.map(student => (
                            <div key={student.id} className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                    <h3>{student.name}</h3>
                                    <span className="badge badge-blue">معدل: {student.gpa}</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    {student.universityId} • {student.major}
                                </div>

                                <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                                    {student.skills.slice(0, 3).map(skill => (
                                        <span key={skill} className="badge badge-gray" style={{ fontSize: '0.7rem', marginLeft: '0.2rem' }}>{skill}</span>
                                    ))}
                                    {student.skills.length > 3 && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}> +{student.skills.length - 3}</span>}
                                </div>

                                {student.recommendations && student.recommendations.length > 0 && (
                                    <div style={{ fontSize: '0.8rem', color: '#059669', marginBottom: '1rem', backgroundColor: '#ecfdf5', padding: '0.5rem', borderRadius: '0.25rem' }}>
                                        لديه {student.recommendations.length} توصية
                                    </div>
                                )}

                                <button
                                    className="btn btn-outline"
                                    onClick={() => setSelectedStudent(student)}
                                    style={{ width: '100%' }}
                                >
                                    إضافة توصية
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {selectedStudent && (
                    <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
                        <div className="modal-content card" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', minWidth: '400px' }}>
                            <h3>{selectedStudent.name}</h3>
                            <textarea
                                value={recommendation}
                                onChange={(e) => setRecommendation(e.target.value)}
                                className="form-input"
                                placeholder="اكتب التوصية..."
                                rows="6"
                                style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontFamily: 'inherit' }}
                            />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setSelectedStudent(null)} style={{ flex: 1 }}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn btn-success" onClick={handleAddRecommendation} style={{ flex: 1 }}>
                                    إضافة
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FacultyPortal;
