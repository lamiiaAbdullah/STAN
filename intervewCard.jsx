import React, { useState } from 'react';

const InterviewCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentScenario, setCurrentScenario] = useState({ q: "", a: "" });

  const scenarios = [
    {
      q: "المحاور: 'تحدث عن أكبر تحدٍ تقني واجهته وكيف تعاملت معه؟'",
      a: "اشرح المشكلة بوضوح، ثم ركز على الخطوات المنطقية التي اتخذتها للحل والنتيجة النهائية."
    },
    {
      q: "المحاور: 'كيف تتعامل مع التغييرات المفاجئة في متطلبات المشروع؟'",
      a: "أظهر مرونتك وقدرتك على ترتيب الأولويات والتواصل الفعال مع الفريق لفهم الأهداف الجديدة."
    },
    {
      q: "المحاور: 'أين ترى نفسك بعد 5 سنوات من الآن؟'",
      a: "تحدث عن طموحك في التطور المهني وكيف تتقاطع أهدافك مع نمو الشركة التي تتقدم إليها."
    }
  ];

  const handleOpen = () => {
    const random = scenarios[Math.floor(Math.random() * scenarios.length)];
    setCurrentScenario(random);
    setIsOpen(true);
    setIsFlipped(false);
  };

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.7); display: flex;
          justify-content: center; align-items: center; z-index: 1000;
        }
        .flip-card {
          perspective: 1000px; width: 320px; height: 400px; cursor: pointer;
        }
        .flip-card-inner {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.6s; transform-style: preserve-3d;
        }
        .flipped .flip-card-inner { transform: rotateY(180deg); }
        .card-face {
          position: absolute; width: 100%; height: 100%;
          backface-visibility: hidden; display: flex; flex-direction: column;
          align-items: center; justify-content: center; padding: 20px;
          border-radius: 15px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .card-front { background: white; color: #333; border: 2px solid #2563eb; }
        .card-back { background: #2563eb; color: white; transform: rotateY(180deg); }
        .close-btn {
          position: absolute; top: -40px; right: 0;
          background: none; border: none; color: white; fontSize: 2rem; cursor: pointer;
        }
        .trigger-btn {
          background: #2563eb; color: white; padding: 12px 24px;
          border: none; border-radius: 8px; cursor: pointer; font-weight: bold;
        }
      `}</style>

      <button className="trigger-btn" onClick={handleOpen}>
         ابدأ سيناريو المقابلة 🎤
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
            
            <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
              <div className="flip-card-inner">
                
                <div className="card-face card-front">
                  <div style={{fontSize: '40px', marginBottom: '15px'}}>💬</div>
                  <h3 style={{margin: '0 0 10px 0'}}>السؤال المتوقع</h3>
                  <p>{currentScenario.q}</p>
                  <small style={{marginTop: '20px', color: '#666'}}>(اضغط للقلب)</small>
                </div>

                <div className="card-face card-back">
                  <div style={{fontSize: '40px', marginBottom: '15px'}}>💡</div>
                  <h3 style={{margin: '0 0 10px 0'}}>نصيحة للإجابة</h3>
                  <p>{currentScenario.a}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewCard;
