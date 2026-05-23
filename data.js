import scrapedJobs from './scraped_jobs.json';

export const students = [
  {
    id: 1,
    name: "سارة محمد",
    major: "علوم حاسب",
    gpa: 4.8,
    location: "الرياض",
    skills: ["Python", "React", "Data Analysis", "SQL"],
    bio: "طالبة شغوفة بعلم البيانات وتطوير الويب."
  },
  {
    id: 2,
    name: "خالد العتيبي",
    major: "هندسة برمجيات",
    gpa: 3.5,
    location: "جدة",
    skills: ["Java", "Spring Boot", "System Design"],
    bio: "أبحث عن فرصة في تطوير الواجهات الخلفية."
  },
  {
    id: 3,
    name: "نورة الغامدي",
    major: "تقنية معلومات",
    gpa: 4.9,
    location: "الدمام",
    skills: ["Network Security", "Linux", "Cybersecurity"],
    bio: "مهتمة بالأمن السيبراني والشبكات."
  }
];

export const companies = [
  {
    id: 101,
    name: "شركة التقنية المتقدمة",
    location: "الرياض",
    logo: "https://via.placeholder.com/50",
    description: "شركة رائدة في مجال الحلول الرقمية."
  },
  {
    id: 102,
    name: "حلول البرمجيات الذكية",
    location: "جدة",
    logo: "https://via.placeholder.com/50",
    description: "نبتكر حلولاً برمجية للمستقبل."
  }
];

export const internships = scrapedJobs;
