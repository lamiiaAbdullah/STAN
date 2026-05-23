import React from 'react';

const platforms = [
  { name: "منصة دروب", desc: "تمكين القوى العاملة وتطوير المهارات.", link: "https://www.doroob.sa", cat: "حكومي" },
  { name: "أكاديمية طويق", desc: "معسكرات تقنية احترافية متميزة.", link: "https://tuwaiq.edu.sa", cat: "تقني" },
  { name: "منصة إثرائي", desc: "تطوير مهارات العمل الحكومي والإداري.", link: "https://ethrai.sa", cat: "إداري" },
  { name: "رواق", desc: "مواد أكاديمية مجانية باللغة العربية.", link: "https://www.rwaq.org", cat: "أكاديمي" }
];

const PlatformsGrid = () => {
  const cardStyle = {
    perspective: '1000px',
    width: '250px',
    height: '300px',
    margin: '10px',
    cursor: 'pointer'
  };

  const innerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
  };

  return (< section dir="rtl" style={{ padding: '2rem 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '1rem' }}>
          دليلك لمنصات التدريب المعتمدة
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#2563eb' }}>
          استكشف أفضل الدورات التدريبية لتطوير مهاراتك في سوق العمل السعودي
        </p>
        <div style={{ height: '5px', width: '80px', backgroundColor: '#3b82f6', margin: '20px auto', borderRadius: '10px' }}></div>
      </div>

    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '40px', direction: 'rtl', backgroundColor: '#f9f9f9' }}>
      {platforms.map((p, i) => (
        <div key={i} style={cardStyle} onMouseEnter={(e) => e.currentTarget.firstChild.style.transform = 'rotateY(180deg)'} onMouseLeave={(e) => e.currentTarget.firstChild.style.transform = 'rotateY(0deg)'}>
          <div style={innerStyle}>
            
            <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#ffffff', color: '#1e3a8a', border: '2px solid #3b82f6', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#60a5fa' }}>{p.cat}</span>
              <h3 style={{ fontSize: '20px', margin: '10px 0' }}>{p.name}</h3>
              <p style={{ fontSize: '12px' }}>مرر لرؤية التفاصيل</p>
            </div>

            <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#2563eb', color: 'white', borderRadius: '15px', transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>{p.desc}</p>
              <a href={p.link} target="_blank" rel="noreferrer" style={{ backgroundColor: 'white', color: '#2563eb', padding: '8px 15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                زيارة الموقع
              </a>
            </div>

          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default PlatformsGrid;
