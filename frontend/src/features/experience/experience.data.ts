export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  focus: string[];
  current?: boolean;
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "foundations",
    year: "2024",
    title: "Programming Foundations",
    description: "Started building my programming foundation and learning core concepts.",
    focus: ["C++", "Problem Solving", "DSA Fundamentals"]
  },
  {
    id: "fullstack",
    year: "2025",
    title: "Full-Stack Development",
    description: "Started exploring web development and building complete applications.",
    focus: ["MERN", "React", "JavaScript", "REST APIs", "Databases"]
  },
  {
    id: "backend",
    year: "Late 2025 / 2026",
    title: "Backend Engineering",
    description: "Moved deeper into backend development and the Java ecosystem.",
    focus: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "REST APIs"]
  },
  {
    id: "scalable",
    year: "2026",
    title: "Scalable Systems & Architecture",
    description: "Currently learning and building more advanced backend systems. Featured work includes my Webhook Delivery Platform.",
    focus: ["Microservices", "Docker", "Redis", "Webhooks", "System Design"],
    current: true
  }
];
