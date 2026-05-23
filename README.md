# 🎓 STAN (Student Training Access Network) Platform

**STAN** is a modern, responsive web-based platform designed to bridge the gap between academic institutions, university students, and training providers. It streamlines, automates, and optimizes the cooperative training (Co-op) and field internship matching process.

---

## 🚨 The Problem
University students face major challenges when securing cooperative training opportunities, including:
* **Scattered Information:** Internship openings, requirements, and deadlines are distributed across disjointed channels, leading to missed opportunities.
* **Manual Tracking Layouts:** Academic supervisors and faculty coordinators struggle with inefficient, paper-based, or manual spreadsheet workflows to track student progress, validation requests, and company assignments.
* **Lack of Preparation:** Students often feel unguided and unprepared when transitioning into professional technical interviews during their placement cycle.

## 💡 The Solution
STAN addresses these pain points by introducing a single, unified electronic hub that:
* **Centralizes Opportunities:** Integrates modern web views listing real-time training offers, scraped roles, and distinct company streams.
* **Automates Workflows:** Provides dedicated portals for faculty administrative review, student alignment, and direct progress evaluations.
* **Boosts Readiness:** Embeds interactive components to simulate professional interview environments and evaluate technical skills before formal placement applications.

---

## 🎯 Key Features
* **Smart Matching Algorithm:** Integrated client-side algorithmic scoring based on student majors (30%), specific technical skill ratios (40%), and GPA thresholds (15%) to recommend the most relevant internships.
* **Interactive AI Interview Simulator:** Embedded flashcard-based component (`InterviewCard`) providing real-time technical questions and behavioral scenarios to boost student readiness before placement.
* **Role-Based Portals:** Seamless view switching between Student Authentication pathways, Job Portals, and Academic Supervisor dashboards (`FacultyPortal`) for seamless tracking.
* **Comprehensive Analytics & Filtering:** Advanced sorting for academic coordinators to filter students and job listings by type (Co-op, Field, or Remote work environments).

---

## 🏗️ System Architecture & Database Design
The platform architecture maps out a highly scalable system ensuring reliable data integrity:
* **Relational Database Architecture (MySQL):** Structured data layers handling secure user authentication, student profiles, company listings, placement history, and supervisor recommendation records.
* **System Models:** Complete UML modeling (Use Case, Sequence, and Entity-Relationship Diagrams) to guarantee smooth relational linkages between stakeholders.

---

## 🛠️ Tech Stack & Implementation Techniques
* **Frontend Library:** React 19 (Leveraging modern functional components, along with hooks like `useState` and `useEffect` to manage application state and filter operations dynamically).
* **Build Tool & Bundler:** Vite 7 (Configured for optimized modular asset bundling and rapid Hot Module Replacement).
* **Styling & Theme:** Tailwind CSS v4 paired with localized typography configurations (`Tajawal` font imports) and custom shadows for a cohesive Arabic/English interface.
* **Icons:** Lucide React icons for intuitive, clean navigation cues.
* **Data Integration Layer:** Relational structure managed through database abstraction services (`dbService`) for persistent data handling, user state preservation, and recommendation updates.

---

## Screenshot
<img width="620" height="268" alt="Picturew1" src="https://github.com/user-attachments/assets/d4194468-509e-4eba-a199-ed7482cd6d28" />
<img width="571" height="268" alt="Picture1" src="https://github.com/user-attachments/assets/1cca0421-3e82-4923-9725-c2121510d24d" />
<img width="571" height="262" alt="Picture1" src="https://github.com/user-attachments/assets/88ee6304-b025-4892-aa20-e45de5082f41" />
<img width="601" height="305" alt="Picture3" src="https://github.com/user-attachments/assets/734a82f4-d572-4a0f-85f5-77b9c9203976" />
<img width="660" height="409" alt="Picture14png" src="https://github.com/user-attachments/assets/3106d715-2fb8-4ba4-a725-52430d457ae5" />


## 📦 Local Installation & Setup

To get a local copy of this repository up and running, follow these simple development steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/STAN-Platform.git](https://github.com/YOUR_USERNAME/STAN-Platform.git)
   cd STAN-Platform
