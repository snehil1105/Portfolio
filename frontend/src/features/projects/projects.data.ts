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
    description: "A high-performance backend webhook delivery platform built with Spring Boot, Redis Streams, and Server-Sent Events (SSE). Features reliable asynchronous event queueing, cache-first Redis status tracking, exponential backoff retries, and real-time event streaming.",
    stack: ["Java 21", "Spring Boot 3", "Spring Data JPA", "PostgreSQL", "Spring Data Redis", "Redis Streams", "Server-Sent Events (SSE)", "Spring Security", "Docker"],
    githubUrl: "https://github.com/snehil1105/Webhook-proj.git",
    highlights: [
      "Redis Streams for high-throughput asynchronous event queueing",
      "Cache-first Redis architecture with PostgreSQL transactional fallback",
      "Server-Sent Events (SSE) for real-time live delivery monitoring",
      "Exponential backoff retry engine & dead-letter queue processing",
      "Spring Security & JWT for secure API endpoint protection",
      "Dockerized microservice environment"
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
