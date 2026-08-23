export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl: string;
  highlights: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "webhook",
    number: "01",
    title: "Webhook Delivery Platform",
    description: "A backend-focused webhook delivery platform designed to manage reliable event delivery between applications. The system focuses on webhook management, delivery processing, retries, security, failure handling, and scalable service architecture.",
    stack: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Redis", "Docker", "Docker Compose", "Microservices"],
    githubUrl: "https://github.com/snehil1105/Webhook-proj.git",
    highlights: [
      "Microservices-based architecture",
      "Reliable webhook delivery workflow",
      "Retry and failure handling concepts",
      "PostgreSQL for persistent data",
      "Redis integration for fast processing/caching",
      "Dockerized local development environment",
      "Secure API access and authentication"
    ]
  },
  {
    id: "ai-resume",
    number: "02",
    title: "AI Resume Ranker",
    description: "An application designed to analyze resumes and help rank candidates based on their relevance to job requirements. The project focuses on automating parts of the resume screening workflow and presenting candidate-related information through a web interface.",
    stack: ["React", "JavaScript", "Spring Boot", "REST APIs", "Database Integration"],
    githubUrl: "https://github.com/snehil1105/AI-Resume-Ranker.git",
    highlights: [
      "Resume and candidate data processing",
      "Ranking-oriented workflow",
      "Frontend and backend integration",
      "REST API-based architecture",
      "Structured data management"
    ]
  },
  {
    id: "insurance",
    number: "03",
    title: "Insurance Premium Calculator",
    description: "A web application that calculates insurance premiums based on user-provided information and selected parameters. The project focuses on creating a simple, interactive experience for collecting input and generating premium-related results.",
    stack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/snehil1105/Insurance_Premium_Calculator.git",
    highlights: [
      "Interactive premium calculation",
      "User-friendly input flow",
      "Dynamic result generation",
      "Responsive web interface"
    ]
  }
];
